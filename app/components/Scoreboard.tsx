import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

type Score = {
    id: number;
    nick__: string;
    points: number;
    flags: number;
}
type ScoreboardProps = {
    scores: Score[];
};
const Scoreboard = ( {scores} :ScoreboardProps ) => {
    return (
        <Card variant="outlined" style={{ width: 400, margin: '0 auto', borderRadius:"10px",}}>
            <CardContent>
                <Typography variant="h3" component="h2" gutterBottom>
                    Scoreboard
                </Typography>
                <TableContainer >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell >Place</TableCell>
                                <TableCell >Name</TableCell>
                                <TableCell >Flags</TableCell>
                                <TableCell align="right">Points</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scores.map((score, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{score.nick__}</TableCell>
                                    <TableCell>{score.flags}/5</TableCell>
                                    <TableCell align="right">{score.points}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow key={0}>
                                <TableCell></TableCell>
                                <TableCell>Brocc</TableCell>
                                <TableCell><span style={{color:"gold"}}>6</span>/5</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default Scoreboard;