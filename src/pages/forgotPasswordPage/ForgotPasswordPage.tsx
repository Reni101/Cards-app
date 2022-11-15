import React from 'react';
import style from "./ForgotPasswordPage.module.css"
import {Button, TextField} from "@mui/material";

export const ForgotPasswordPage = () => {
    return (
        <div className={style.ForgotPasswordPage}>
            <div className={style.MainBlock}>
                <h2>Forgot your password?</h2>
                <TextField label="Email" variant="standard"/>
                <div>Enter your email address</div>
                <Button variant="outlined" type="submit">Send Instructions</Button>
            </div>
        </div>
    );
};

