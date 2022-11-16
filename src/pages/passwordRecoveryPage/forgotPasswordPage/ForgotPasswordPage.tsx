import React from 'react';
import style from "./ForgotPasswordPage.module.css"
import {Button, TextField} from "@mui/material";
import {Navigate, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {forgotPasswordTC} from "../RecoveryPasswordReducer";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Slide} from 'react-awesome-reveal';

export const ForgotPasswordPage = () => {

    const email = useAppSelector(store => store.ForgotPassword.email)
    const dispatch = useAppDispatch()
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
                <NavLink to={"/"} className={style.Link}> Try logging in </NavLink>

            </div>
        </Slide>
    );
};

