import React from 'react';
import style from "../RegistrationPage.module.css";
import SuperInputText from "../../../common/SuperInputText/SuperInputText";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {useFormik} from "formik";
import {registrationTC} from "../../../Redux/RegistrationReducer";
import {useAppDispatch} from "../../../hooks/hooks";
import InputForRegistration from "./InputForRegistration";


type FormForRegistrationProps = {}

const FormForRegistration = (props: FormForRegistrationProps) => {

    const dispatch = useAppDispatch()

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

    return (
        <form onSubmit={formik.handleSubmit} className={style.RegistrationPageForm}>
            <div className={style.emailBlock}>
                <InputForRegistration
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name={'email'}
                    label={'Email'}

                />


            </div>
            <div className={style.passwordBlock}>
                <InputForRegistration
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    name={'password'}
                    label={'Password'}

                />

            </div>
            <div className={style.confirmPasswordBlock}>
                <InputForRegistration
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    name={'confirmPassword'}
                    label={'Confirm password'}

                />
            </div>
                <div className={style.signUpBlockBtn}>
                    <SuperButton style={{width: '347px'}}>Sign up</SuperButton>
                </div>
        </form>
)
}

export default FormForRegistration;