import React from 'react';
import style from './RegistrationPage.module.css'
import SuperInputText from "../../common/SuperInputText/SuperInputText";
import SuperButton from "../../common/SuperButton/SuperButton";
import {useFormik} from "formik";
import {registrationTC} from "../../Redux/RegistrationReducer";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Navigate, useNavigate} from "react-router-dom";

export const RegistrationPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isSuccessful = useAppSelector (state => state.Registration.isSuccessfulRegistration)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: values => {
            const data = {
                email: values.email,
                password: String(values.password)
            }

            dispatch(registrationTC(data))
        },
    });


    const signInClick = () => {
        navigate('/login')
    }

    if (isSuccessful) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={style.registrationPageBlock}>
            <div className={style.registrationPageContent}>
                <div className={style.registrationPageTitle}>
                    Sign Up
                </div>
                <form onSubmit={formik.handleSubmit} className={style.RegistrationPageForm}>
                    <div className={style.emailBlock}>
                        <span>Email</span>
                        <SuperInputText
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            style={{width: '347px'}} type="text"/>
                    </div>
                    <div className={style.passwordBlock}>
                        <span>Password</span>
                        <SuperInputText
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            style={{width: '347px'}} type="password"/>
                    </div>
                    <div className={style.confirmPasswordBlock}>
                        <span>Confirm password</span>
                        <SuperInputText
                            name='confirmPassword'
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            style={{width: '347px'}} type="password"/>
                    </div>
                    <div className={style.signUpBlockBtn}>
                        <SuperButton style={{width: '347px'}}>Sign up</SuperButton>
                    </div>
                </form>
                <div className={style.signInBlock}>
                    <div className={style.signInTitle}>Already have an account?</div>
                    <div onClick={signInClick} className={style.signInBtn}>Sign in</div>

                </div>
            </div>
        </div>
    );
};

