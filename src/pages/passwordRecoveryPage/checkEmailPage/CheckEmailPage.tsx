import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import style from './CheckEmailPage.module.css'
import CheckEmail from "../../../assets/chekEmail.svg"
import {Slide} from 'react-awesome-reveal';
import {setRecoverEmailAC} from "../RecoveryPasswordReducer";
import {useAppDispatch, useAppSelector} from "../../../redux/Store";

export const CheckEmailPage = () => {
    const dispatch = useAppDispatch()
    const email = useAppSelector(store => store.ForgotPassword.email)

    useEffect(() => {
        return () => {
            dispatch(setRecoverEmailAC({email: null}))
        }
    }, [dispatch])


    return (
        <Slide direction={'up'}>
            <div className={style.wrapper_checkEmail}>
                <h2 className={style.Title}>Check Email</h2>
                <img src={CheckEmail} alt=""/>
                <div className={style.Text}>We’ve sent an Email with instructions to {email}</div>
                <div className={style.Link}><NavLink to={"/"}> Back to login </NavLink></div>
            </div>

        </Slide>
    );
};

