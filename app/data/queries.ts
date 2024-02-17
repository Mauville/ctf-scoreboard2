import prisma from "../db";
import {FlagBundle, FlagStrings, FlagType, FlagTypes} from "@/app/data/FlagTypes";
import {AssertionError} from "assert";
import {users2} from ".prisma/client";

export function getFlagBundle(flag: string): FlagBundle {
    let flagtype = FlagTypes.FLAG0_INVALID;
    let flagstring = FlagStrings.CORRECT;

    switch (flag) {
        case process.env.FLAG1_TRANS_STRING:
            flagtype = FlagTypes.FLAG1_TRANSCEND;
            break;
        case process.env.FLAG2_PROJECT_STRING:
            flagtype = FlagTypes.FLAG2_PROJECT;
            break;
        case process.env.FLAG3_TRANSFORM_STRING:
            flagtype = FlagTypes.FLAG3_TRANSFORM;
            break;
        case process.env.FLAG0_INVALID_STRING:
            flagtype = FlagTypes.FLAG0_INVALID;
            flagstring = FlagStrings.NEEDS_REFINING;
            break;
        case process.env.FLAG4_BITS_STRING:
            flagtype = FlagTypes.FLAG4_BITS;
            flagstring = FlagStrings.BING_BING;
            break;
        case process.env.FLAG6_SS_STRING:
            flagtype = FlagTypes.FLAG6_SS;
            flagstring = FlagStrings.SS;
            break;
        case process.env.FLAG5_DPAD_STRING:
            flagtype = FlagTypes.FLAG5_DPAD;
            break;
        case process.env.INCORRECT_PAD_STRING_1:
        case process.env.INCORRECT_PAD_STRING_2:
            flagtype = FlagTypes.FLAG0_INVALID;
            flagstring = FlagStrings.INCORRECT_PAD;
            break;
        default:
            flagstring = FlagStrings.INCORRECT;
            break;
    }
    return {flagtype: flagtype, flagstring: flagstring}
}

export async function addUser(nick: string, password: string) {
    const user = await prisma.users2.create({
        // @ts-ignore
        data: {
            nick__: nick,
            password: password,
        },
    })
    console.log(user)
}

export async function checkUsernameIsFree(nick:string){
    try{
        const user = await prisma.users2.findFirst({where:{nick__:nick}})
        return user === null;
    }
    catch (e){
        throw e;
    }

}
export async function checkUserExists(nick: string, password: string) {
    return prisma.users2.findFirst({
        where: {
            nick__: nick,
            password: password,
        }
    })
}

export async function alreadySubmittedFlag(nick: string, password: string, flag: FlagType) {
    const user = await prisma.users2.findFirst({
        where: {
            nick__: nick,
            password: password
        }
    });
    if (user !== null) {
        switch (flag) {
            case FlagTypes.FLAG1_TRANSCEND:
                return user.FLAG1_TRANSCEND !== null;
            case FlagTypes.FLAG2_PROJECT:
                return user.FLAG2_PROJECT !== null;
            case FlagTypes.FLAG3_TRANSFORM:
                return user.FLAG3_TRANSFORM !== null;
            case FlagTypes.FLAG4_BITS:
                return user.FLAG4_BITS !== null;
            case FlagTypes.FLAG5_DPAD:
                return user.FLAG5_DPAD !== null;
            case FlagTypes.FLAG6_SS:
                return user.FLAG6_SS !== null;
            default:
                throw Error("Invalid flag has been submitted");
        }
    }
    throw Error("User is null?");
}

export async function addFlag(nick: string, password: string, flag: FlagType) {
    const now = Date.now() + "";
    const user = await prisma.users2.findFirst({
        where: {
            nick__: nick,
            password: password
        }
    });
    // ADD POINTING FUNCTION HERE.
    let flagPair = {}

    switch (flag) {
        case FlagTypes.FLAG1_TRANSCEND:
            flagPair = {FLAG1_TRANSCEND: now};
            break;
        case FlagTypes.FLAG2_PROJECT:
            flagPair = {FLAG2_PROJECT: now};
            break;
        case FlagTypes.FLAG3_TRANSFORM:
            flagPair = {FLAG3_TRANSFORM: now};
            break;
        case FlagTypes.FLAG4_BITS:
            flagPair = {FLAG4_BITS: now};
            break;
        case FlagTypes.FLAG5_DPAD:
            flagPair = {FLAG5_DPAD: now};
            break;
        case FlagTypes.FLAG6_SS:
            flagPair = {FLAG6_SS: now};
            break;
        default:
            throw Error("Invalid flag has been submitted");
    }
    // @ts-ignore
    flagPair.flags = user.flags +1;
    if (user !== null) {
        console.log("User updated successfully")
        try{
            const newuser = await prisma.users2.update({
                where: {
                    id: user.id,
                },
                data: flagPair
            });
            console.log(newuser);
        }
        catch(e){
            console.log("DIES")
            throw e;
        }
    } else {
        throw Error("User is null.");
    }
}

export async function getScores() {
    return await prisma.users2.findMany({
            select: {
                id: true,
                nick__: true,
                points: true,
                flags: true,
            },
            orderBy: {
                points: 'desc'
            }
        }
    );
}