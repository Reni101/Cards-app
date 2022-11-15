import React, {useState} from 'react';
import style from "./ForgotPasswordPage.module.css"
import {Button, TextField} from "@mui/material";
import {Navigate, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {forgotPasswordTC} from "../RecoveryPasswordReducer";
import {useFormik} from "formik";


export const ForgotPasswordPage = () => {

    const email = useAppSelector(store => store.ForgotPassword.email)

    if (!!email){
        <Navigate to="/check-email-page"/>
    }

    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',

        },
        onSubmit: values => {
            dispatch(forgotPasswordTC(values.email))
            formik.resetForm()

        },
    });
    return (
        <div className={style.ForgotPasswordPage}>
            <div className={style.MainBlock}>
                <h2>Forgot your password?</h2>
                <form onSubmit={formik.handleSubmit}>
                    <TextField label="Email"
                               margin="normal"
                               {...formik.getFieldProps('email')}
                    />
                    <div>Enter your email address and we will send you further instructions</div>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Send Instructions
                    </Button>
                </form>


                <div>Did you remember your password?</div>
                <NavLink to={"/login"}> Try logging in </NavLink>
            </div>
        </div>
    );
};

