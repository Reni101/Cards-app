import React from 'react';
import style from "./ForgotPasswordPage.module.css"
import {Button, TextField, LinearProgress} from "@mui/material";
import {Navigate, NavLink} from "react-router-dom";
import {forgotPasswordTC} from "../../../redux/Recovery-reducer";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Slide} from 'react-awesome-reveal';
import {requestStatusType} from "../../../redux/App-reducer";
import {useAppDispatch, useAppSelector} from "../../../redux/Store";

export const ForgotPasswordPage = () => {
    const dispatch = useAppDispatch()
    const email = useAppSelector(store => store.ForgotPassword.email)
    const status = useAppSelector<requestStatusType>(state => state.App.status)

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('invalid email address').required('required'),
        }),
        onSubmit: values => {
            dispatch(forgotPasswordTC(values.email))
        },
    });

    if (!!email) {
        return <Navigate to='/check-email-page'/>
    }

    return (
        <Slide direction={'down'}>
            <div className={style.wrapper_forgot}>
                {status === "loading" && <LinearProgress color="primary"/>}

                <h2>Forgot your password?</h2>

                <form onSubmit={formik.handleSubmit} className={style.formContainer}>
                    <TextField className={style.formInput}
                               label="Email"
                               margin="normal"
                               fullWidth={true}
                               error={!!(formik.touched.email && formik.errors.email)}
                               {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className={style.validation}>{formik.errors.email}</div>)}

                    <div className={style.text}>
                        Enter your email address and we will send you further instructions
                    </div>

                    <Button type={'submit'} variant={'outlined'} color={'primary'}>
                        Send Instructions
                    </Button>
                </form>

                <div className={style.rememberPassword}>
                    <div>Did you remember your password?</div>
                    <NavLink to={"/"}> Try logging in </NavLink>
                </div>
            </div>
        </Slide>
    );
};

