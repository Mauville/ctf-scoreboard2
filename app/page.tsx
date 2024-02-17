import Scoreboard from "@/app/components/Scoreboard";
import {getScores} from "@/app/data/queries";

import SubmitFlagForm from "@/app/components/SubmitFlagForm";
import Message from "@/app/components/MessageBox";
export default async function Home() {
    const scores = await getScores();

    return (
        <main className="flex min-h-screen flex-wrap max-sm:flex-col-reverse justify-between p-2 lg:p-24">
            <Message/>
            {/*// @ts-ignore*/}
            <Scoreboard scores={scores}/>
            {/*<CaptchaEnabledForm/>*/}
                <SubmitFlagForm />
        </main>
    );
}
