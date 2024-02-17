// src/theme.ts
'use client';
import {VT323} from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const vt323 = VT323({
    weight: [ '400'],
    subsets: ['latin'],
    display: 'swap',
});


const theme = createTheme({
    typography: {
        fontFamily: vt323.style.fontFamily,
        fontSize:18,
        h3: {
            fontFamily: "Honk",
            fontSize:50,
            textShadow: undefined,
        },
    },
    palette:{
        mode: "dark",
        background: {
            paper: '#000029',
        },
        primary: {
            main: '#ef6c00',
        },
        secondary: {
            main: '#f50057',
        },
    }
});

export default theme;
