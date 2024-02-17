'use client';
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
import {processForm} from "@/app/data/actions";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {useState} from "react";

export default function SubmitFlagForm(){

   const [token, setToken] = useState("");
   function handleVerificationSuccess(token: string, ekey: string) {
     console.log(token);
     setToken(token);
   }

   return (
       <Card variant="outlined" style={{ width: 335, marginTop: 0, marginBottom: "auto", marginRight: "auto",marginLeft: 'auto', borderRadius:"10px"}}>
          <CardContent>
             <Typography variant="h3"  component="h2" gutterBottom>
                Submit Flag
             </Typography>
             <form action={processForm}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Nickname"
                    name="nick__"
                    variant="outlined"
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Password (Assume unsafe)"
                    name="password"
                    type="password"
                    variant="outlined"
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    name="flag"
                    label="Flag"
                    variant="outlined"
                    required
                />
                <input type="hidden" name="htoken" value={token}/>
                {
                   process.env.debug == "FALSE"?(
                   <HCaptcha
                   theme="dark"
                   sitekey="bf3854bb-4e34-49be-8e46-cbddaa6fb32c"
                   onVerify={(token,ekey) => handleVerificationSuccess(token, ekey)}
                   />): null

                }
                <Button
                    type="submit"
                    variant="contained"
                    // color="primary"
                    fullWidth
                    style={{ marginTop: 10 }}
                >
                   Submit
                </Button>
             </form>
          </CardContent>
       </Card>
   );
}