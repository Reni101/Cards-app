import React, {useEffect} from 'react';
import style from './RegistrationPage.module.css'
import {Navigate, NavLink} from "react-router-dom";
import FormForRegistration from "./formForRegistration/FormForRegistration";
import {Slide} from "react-awesome-reveal";
import {LinearProgress} from "@mui/material";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../redux/Store";
import {requestStatusType} from "../../redux/App-reducer";
import {setRegistrationAC} from "../../redux/Registration-reducer";

export const RegistrationPage = () => {
    const dispatch = useDispatch()
    const isSuccessful = useAppSelector(state => state.Registration.isSuccessfulRegistration)
    const status = useAppSelector<requestStatusType>(state => state.App.status)

    useEffect(() => {
        return () => {
            dispatch(setRegistrationAC({data: false}))
        }
    }, [dispatch])

    if (isSuccessful) {
        return <Navigate to={'/'}/>
    }


    return (
        <Slide direction={'down'}>
            <div className={style.all_wrapper_reg}>
                <div className={style.registrationPageBlock}>
                    {status === 'loading' && <div className="loading"><LinearProgress color="secondary"/></div>}
                    <div className={style.registrationPageContent}>

                        <div className={style.registrationPageTitle}>
                            Sign Up
                        </div>
                        <div className={style.signInBlock}>
                            <FormForRegistration/>
                            <div className={style.signInTitle}>Already have an account?</div>
                            <NavLink to={'/'}>
                                <div className={style.signInBtn}>Sign in</div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </Slide>
    )
}



