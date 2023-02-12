import React from 'react';
import style from "./ForgotPasswordPage.module.css"
import {Button, TextField, LinearProgress} from "@mui/material";
import {Navigate, NavLink} from "react-router-dom";
import {forgotPasswordTC} from "../RecoveryPasswordReducer";
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
            // formik.resetForm()

        },
    });

    if (!!email) {
        return <Navigate to='/check-email-page'/>
    }
    return (
        <Slide direction={'up'}>
            <div className={style.wrapper_forgot}>
                {status === "loading" && <div><LinearProgress color="primary"/></div>}

                <h2 className={style.title}>Forgot your password?</h2>


                <div className={style.FormStyle}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField label="Email"
                                   margin="normal"
                                   color={formik.touched.email && formik.errors.email ? 'error' : 'success'}
                                   {...formik.getFieldProps('email')

                                   }
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className={style.validation}>{formik.errors.email}</div>
                        ) : null}
                        <div className={style.Text}>Enter your email address and we will send you further instructions
                        </div>
                        <Button type={'submit'} variant={'outlined'} color={'primary'}>
                            Send Instructions
                        </Button>
                    </form>
                </div>


                <div className={style.Text}>Did you remember your password?</div>
                <div className={style.link}><NavLink to={"/"}> Try logging in </NavLink></div>

            </div>
        </Slide>
    );
};

