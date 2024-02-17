'use client';

import {useEffect} from 'react';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);


    return (
        <main className="flex h-full flex-col items-center justify-center" style={{marginTop: "35vh"}}>
            <p>{error.message}</p>
            {/*Nextjs cannot link me out and I'm too tired to find out why. Neither link nor the hook work*/}
            <a href="/">
                <button
                    className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                >
                    Try Again.
                </button>
            </a>
        </main>
    );
}