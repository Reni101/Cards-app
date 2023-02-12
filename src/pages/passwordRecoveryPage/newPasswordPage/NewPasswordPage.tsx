import React from 'react';
import {Navigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import {setNewPasswordTC} from "../RecoveryPasswordReducer";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    LinearProgress
} from "@mui/material";
import style from './NewPasswordPage.module.css'
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Slide} from 'react-awesome-reveal';
import * as Yup from "yup";
import {requestStatusType} from "../../../redux/App-reducer";
import {useAppDispatch, useAppSelector} from "../../../redux/Store";

export const NewPasswordPage = () => {
    let {token} = useParams();
    const dispatch = useAppDispatch()
    const isRedirectToLogin = useAppSelector(state => state.ForgotPassword.isRedirectToLogin)
    const status = useAppSelector<requestStatusType>(state => state.App.status)


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
        validationSchema: Yup.object().shape({
            password: Yup.string().min(8, 'must be 8 characters long'),
        }),
        onSubmit: values => {
            dispatch(setNewPasswordTC(values.password, token ? token : "bad token"))
            formik.resetForm()

        },
    });

    if (isRedirectToLogin) {
        return <Navigate to={"/"}/>
    }
    return (
        <Slide direction={'up'}>
            <div className={style.wrapper_newPasswowrd}>
                {status === "loading" && <div><LinearProgress color="primary"/></div>}
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
                                color={formik.touched.password && formik.errors.password ? 'error' : 'success'}
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
                            {formik.touched.password && formik.errors.password ? (
                                <div className={style.validation}>{formik.errors.password}</div>
                            ) : null}
                        </FormControl>


                        <div className={style.Text}>Create new password and we will send you further instructions to
                            email
                        </div>
                        <Button className={style.button} type={'submit'} variant={'outlined'} color={'primary'}>
                            Create new password
                        </Button>
                    </form>
                </div>

            </div>
        </Slide>
    );
};