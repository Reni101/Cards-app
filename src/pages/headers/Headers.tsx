import React from 'react';
import { useNavigate } from "react-router-dom";
import style from './Headers.module.css'
import black_logo from '../../assets/webLogo/pink_punk_black.svg'
import {Button} from '@mui/material';

export const Headers = () => {

    const navigate = useNavigate();
    const goSignUp = () => {
            navigate('/registration')
    }

    return (
        <div className={style.header_box}>
            <div className={style.website_logo}>
                <img src={black_logo} alt="logo is late"/>
            </div>
            <div className={style.header_wrapper}>
                <Button className={style.button} variant="outlined" onClick={goSignUp} type="submit">
                     sign up
                </Button>
            </div>
        </div>
    );
};
