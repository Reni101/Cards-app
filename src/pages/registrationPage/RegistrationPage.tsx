import React from 'react';
import style from './RegistrationPage.module.css'
import {useAppSelector} from "../../hooks/hooks";
import {Navigate, useNavigate} from "react-router-dom";

import FormForRegistration from "./formForRegistration/FormForRegistration";

export const RegistrationPage = () => {

    const navigate = useNavigate()
    const isSuccessful = useAppSelector (state => state.Registration.isSuccessfulRegistration)


    const signInClick = () => {
        navigate('/login')
    }

    if (isSuccessful) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={style.registrationPageBlock}>
            <div>

            </div>
            <div className={style.registrationPageContent}>
                <div className={style.registrationPageTitle}>
                    Sign Up
                </div>
                <div className={style.signInBlock}>
                    <FormForRegistration/>
                    <div className={style.signInTitle}>Already have an account?</div>
                    <div onClick={signInClick} className={style.signInBtn}>Sign in</div>

                </div>
            </div>
        </div>
    );
};

