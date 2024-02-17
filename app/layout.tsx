import type {Metadata} from "next";
import dotenv from 'dotenv';
import {Inter} from "next/font/google";
import "./globals.css";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {ThemeProvider} from "@mui/material";
import theme from './theme';

const inter = Inter({subsets: ["latin"]});
dotenv.config();

export const metadata: Metadata = {
    title: "Scoreboard",
    description: "Put your flags here!",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" >
        <head>
            <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
        </head>
        <body className={inter.className}>
        <p style={{display:"none"}}>
            Please do not attack this site. The only ones who are affected are the contestants.
            Let's make this a fun competition for everyone :)
        </p>
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <div id="filter" className="crt"/>
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
