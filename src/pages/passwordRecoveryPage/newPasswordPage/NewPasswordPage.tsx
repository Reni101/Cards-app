import React from 'react';
import {Navigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {useFormik} from "formik";
import {setNewPasswordTC} from "../RecoveryPasswordReducer";
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import style from './NewPasswordPage.module.css'
import {Visibility, VisibilityOff} from "@mui/icons-material";

export const NewPasswordPage = () => {
    let {token} = useParams();
    const dispatch = useAppDispatch()
    const isRedirectToLogin = useAppSelector(state => state.ForgotPassword.isRedirectToLogin)


    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const formik = useFormik({
        initialValues: {
            password: '',

        },
        onSubmit: values => {
            dispatch(setNewPasswordTC(values.password, token ? token : "bad token"))
            formik.resetForm()

        },
    });

    if (isRedirectToLogin) {
        return <Navigate to={"/login"}/>
    }
    return (
        <div className={style.NewPasswordPage}>
            <div className={style.MainBlock}>
                <h2 className={style.Title}>Create new password</h2>
                <div className={style.FormStyle}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        <div className={style.Text}>Create new password and we will send you further instructions to
                            email
                        </div>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Create new password
                        </Button>
                    </form>
                </div>

            </div>
        </div>
    );
};