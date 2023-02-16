import React from 'react';
import {Navigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import {setNewPasswordTC} from "../../../redux/Recovery-reducer";
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
            password: Yup.string().min(8, 'must be 8 characters long')
                .required('required'),
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
        <Slide direction={'down'}>
            <div className={style.wrapper_newPassword}>
                <div className={style.wrapper}>

                    {status === "loading" && <LinearProgress color="primary"/>}

                    <h2>Create new password</h2>

                    <form onSubmit={formik.handleSubmit} className={style.formContainer}>

                        <FormControl variant="outlined" className={style.formInput}>
                            <InputLabel
                                error={!!(formik.touched.password && formik.errors.password)}>Password</InputLabel>
                            <OutlinedInput
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.password && formik.errors.password)}
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
                            {formik.touched.password && formik.errors.password && (
                                <div className={style.validation}>{formik.errors.password}</div>)}
                        </FormControl>


                        <div className={style.text}>Create new password and
                            we will send you further instructions to email
                        </div>

                        <Button className={style.button}
                                type={'submit'}
                                variant={'outlined'}
                                color={'primary'}>
                            Create new password
                        </Button>
                    </form>

                </div>
            </div>
        </Slide>
    );
};