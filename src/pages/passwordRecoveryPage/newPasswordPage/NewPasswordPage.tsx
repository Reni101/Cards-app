import React from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../../hooks/hooks";
import {useFormik} from "formik";
import {setNewPasswordTC} from "../RecoveryPasswordReducer";
import {Button, TextField} from "@mui/material";
import style from './NewPasswordPage.module.css'

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
        <div className={style.NewPasswordPage}>
            <div className={style.MainBlock}>
                <h2 className={style.Title}>Create new password</h2>
              <div  className={style.FormStyle}>
                  <form onSubmit={formik.handleSubmit}>
                      <TextField label="password"
                                 type='password'
                                 margin="normal"
                                 {...formik.getFieldProps('password')}
                      />
                      <div className={style.Text}>Create new password and we will send you further instructions to email</div>
                      <Button type={'submit'} variant={'contained'} color={'primary'}>
                          Create new password
                      </Button>
                  </form>
              </div>

            </div>
        </div>
    );
};

