import React from 'react';
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../hooks/hooks";
import style from './checkEmailPage.module.css'
import CheckEmail from "../../../assets/chekEmail.svg"
import {Slide} from 'react-awesome-reveal';

export const CheckEmailPage = () => {

    const email = useAppSelector(store => store.ForgotPassword.email)
    return (
        <Slide direction={'up'}>

            <div className={style.wrapper_checkEmail}>
                <h2 className={style.Title}>Check Email</h2>
                <img src={CheckEmail} alt=""/>

                <div className={style.Text}>We’ve sent an Email with instructions to {email}</div>
                <NavLink to={"/"} className={style.Link}> Back to login </NavLink>
            </div>

        </Slide>
    );
};

