import React from 'react';
import style from "../RegistrationPage.module.css";
import {useFormik} from "formik";
import {registrationTC} from "../../../Redux/RegistrationReducer";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import InputForRegistration from "./InputForRegistration";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";


type FormForRegistrationProps = {}
type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

const FormForRegistration = (props: FormForRegistrationProps) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const errorApi = useAppSelector(state => state.Registration.error)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: (values) => {

            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (values.password.length < 7) {
                errors.password = 'Password must be more than 7 characters...'
            }
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Password is not the same'
            }
            if (!values.password) {
                errors.password = 'Required'
            }

            return errors
        },
        onSubmit: values => {
            const data = {
                email: values.email,
                password: String(values.password)
            }
            dispatch(registrationTC(data))
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className={style.RegistrationPageForm}>
            <div className={style.emailBlock}>
                <InputForRegistration
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name={'email'}
                    label={'Email'}
                    onBlur={formik.handleBlur}
                    error={formik.errors.email}
                    touched={formik.touched}
                />
                <div style={{height: '30px'}}>
                    {formik.touched.email && <span style={{color: 'red'}}>{formik.errors.email}</span>}
                </div>
            </div>
            <div className={style.passwordBlock}>
                <InputForRegistration
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    name={'password'}
                    label={'Password'}
                    onBlur={formik.handleBlur}
                    error={formik.errors.password}
                    touched={formik.touched}
                />
                <div style={{height: '30px'}}>
                    {formik.touched.password && <span style={{color: 'red'}}>{formik.errors.password}</span>}
                </div>
            </div>
            <div className={style.confirmPasswordBlock}>
                <InputForRegistration
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    name={'confirmPassword'}
                    label={'Confirm password'}
                    onBlur={formik.handleBlur}
                    error={formik.errors.confirmPassword}
                    touched={formik.touched}
                />
                <div style={{height: '30px'}}>
                    {formik.touched.confirmPassword &&
                        <span style={{color: 'red'}}>{formik.errors.confirmPassword}</span>}
                    <span style={{color: 'red'}}>{errorApi}</span>
                </div>
            </div>
            <div className={style.signUpBlockBtn}>
                <Button className={style.button} variant="outlined" type="submit">SIGN IN</Button>
            </div>
        </form>
    )
}

export default FormForRegistration;