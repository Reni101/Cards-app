import React, {useEffect} from 'react';
import style from './RegistrationPage.module.css'
import {useAppSelector} from "../../hooks/hooks";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import FormForRegistration from "./formForRegistration/FormForRegistration";
import {Slide} from "react-awesome-reveal";
import {LinearProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/Store";
import {requestStatusType} from "../../AppReducer";
import {setRegisrationAC} from "./RegistrationReducer";

export const RegistrationPage = () => {

    const isSuccessful = useAppSelector(state => state.Registration.isSuccessfulRegistration)
    const status = useSelector<AppRootStateType, requestStatusType>(state => state.App.status)
    const dispatch = useDispatch()
    
    useEffect(() => {
        return () => {
            dispatch(setRegisrationAC(false))
        }
    }, [])

    if (isSuccessful) {
        return <Navigate to={'/'}/>
    }


    return (
        <Slide direction={'up'}>
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



