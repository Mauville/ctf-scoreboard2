'use server';

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import axios from "axios";
import {
    addFlag,
    addUser,
    alreadySubmittedFlag,
    checkUserExists,
    checkUsernameIsFree,
    getFlagBundle
} from "@/app/data/queries";
import {FlagTypes} from "@/app/data/FlagTypes";

async function validateCaptcha(htoken?: string) {
    if (htoken === null) {
        return false;
    }
    const url = 'https://api.hcaptcha.com/siteverify';
    const payload = {
        response: htoken,
        secret: process.env.HCAPTCHA_SECRET
    };

    const {data} = await axios.post(url, payload, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    console.log('Response:', data);
    if (data.success !== null) {
        console.log(data);
        return data.success;

    } else {
        return false;
    }
}

export async function processForm(formData: FormData) {
    //Validate captcha
    const htoken = formData.get("htoken");
    const res = await validateCaptcha(htoken?.toString());
    if (!res && process.env.debug == "FALSE") {
        throw Error('An error has ocurred. Please retry.');
    }

    //Implement cool validation here lol
    const nick: string = formData.get("nick__") as string;
    const password: string = formData.get("password") as string;
    const flag: string = formData.get("flag") as string;


    if (nick !== null && password !== null) {
        const flagBundle = getFlagBundle(flag);
        console.log(flagBundle)
        // Don't add user if flag is invalid
        if (flagBundle.flagtype === FlagTypes.FLAG0_INVALID) {
            throw Error(flagBundle.flagstring);
        }
        // If username is free, create user
        if (await checkUsernameIsFree(nick)) {
            if (flagBundle.flagtype != FlagTypes.FLAG1_TRANSCEND) {
                throw Error("New users shouldn't be able to submit advanced flags. Check your username or try with the first flag.")
            }
            await addUser(nick, password);
        }
        // Check if password is correct for users
        if (await checkUserExists(nick, password) == null) {
            throw Error("Incorrect password or username is taken. Try again.")
        }
        if (await alreadySubmittedFlag(nick, password, flagBundle.flagtype)) {
            throw Error("Flag has already been submitted :/");
        }
        try {
            await addFlag(nick, password, flagBundle.flagtype)
        } catch (e) {
            throw e;
        }
        revalidatePath("/");
        redirect("/?msg=" + flagBundle.flagstring);
    }
}