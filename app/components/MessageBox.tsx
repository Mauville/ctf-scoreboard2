'use client';
import {useSearchParams} from "next/navigation";
import {Alert, Slide} from "@mui/material";
import {useEffect, useState} from "react";

export default function Message() {
    const searchParams = useSearchParams();
    const [showMessage, setShowMessage] = useState(false);
    let hasShowedMessage = false;


    useEffect(() => {
        if(!hasShowedMessage){
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);

            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, []); // Empty dependency array ensures effect runs only once after mount

    if (!searchParams.has("msg")) {
        return null;
    }
    return (
        <div className={"absoluteDown"}>
            <Slide direction="down" in={showMessage} mountOnEnter unmountOnExit>
                <Alert severity="success">
                    {searchParams.get("msg")}
                </Alert>
            </Slide>
        </div>
    )

}
