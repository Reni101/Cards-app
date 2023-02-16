import React, {useEffect} from 'react';
import style from './RegistrationPage.module.css'
import {Navigate, NavLink} from "react-router-dom";
import {FormForRegistration} from "./formForRegistration/FormForRegistration";
import {Slide} from "react-awesome-reveal";
import {LinearProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../redux/Store";
import {requestStatusType} from "../../redux/App-reducer";
import {setRegistrationAC} from "../../redux/Registration-reducer";

export const RegistrationPage = () => {
    const dispatch = useAppDispatch()
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
                <div className={style.wrapper}>

                    {status === 'loading' && <LinearProgress color="primary"/>}

                    <h2> Sign Up </h2>

                    <FormForRegistration/>

                    <div className={style.signInTitle}>
                        <div>Already have an account?</div>
                        <NavLink to={'/'}> Sign in </NavLink>
                    </div>
                </div>
            </div>
        </Slide>
    )
}



