import React from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../../hooks/hooks";
import {useFormik} from "formik";
import {forgotPasswordTC, setNewPasswordTC} from "../RecoveryPasswordReducer";
import {Button, TextField} from "@mui/material";

export const NewPasswordPage = () => {
    let {token} = useParams();
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            password: '',

        },
        onSubmit: values => {
            dispatch(setNewPasswordTC(values.password, token ? token : "bad token"))
            formik.resetForm()

        },
    });
    return (
        <div>
            <div>
                <h2>Create new password</h2>
                <form onSubmit={formik.handleSubmit}>
                    <TextField label="password"
                               type='password'
                               margin="normal"
                               {...formik.getFieldProps('password')}
                    />
                    <div>Create new password and we will send you further instructions to email</div>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Create new password
                    </Button>
                </form>

            </div>
        </div>
    );
};

