import React, {useState} from 'react';
import {useFormik} from "formik";
import {registrationTC} from "../../../redux/Registration-reducer";
import {Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {useAppDispatch} from "../../../redux/Store";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import style from './FormForRegistration.module.css'
import * as Yup from "yup";

type InitialValuesType = {
    email: string
    password: string
    confirmPassword: string
}

export const FormForRegistration = () => {
    const dispatch = useAppDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('invalid email address').required('required'),
            password: Yup.string()
                .min(8, 'must be 8 characters long')
                .required('required'),
            confirmPassword: Yup.string().required('required')
                .oneOf([Yup.ref('password')], 'passwords must match')
        }),
        onSubmit: (values: InitialValuesType) => {
            dispatch(registrationTC({email: values.email, password: values.password}))
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className={style.formContainer}>

            <div className={style.input}>
                <TextField
                    fullWidth={true}
                    name="email"
                    onChange={formik.handleChange}
                    label="Email"
                    variant="outlined"
                    error={!!(formik.touched.email && formik.errors.email)}/>

                {formik.touched.email && formik.errors.email &&
                    <div className={style.validation}>{formik.errors.email}</div>}

            </div>

            <FormControl fullWidth={true} variant="outlined" className={style.input}>
                <InputLabel htmlFor="outlined-adornment-password"
                            error={!!(formik.touched.password && formik.errors.password)}>
                    Password
                </InputLabel>

                <OutlinedInput
                    name="password"
                    onChange={formik.handleChange}
                    type={showPassword ? 'text' : 'password'}
                    error={!!(formik.touched.password && formik.errors.password)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
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

                {formik.touched.password && formik.errors.password &&
                    <div className={style.validation}>{formik.errors.password}</div>}

            </FormControl>

            <FormControl fullWidth={true} variant="outlined" className={style.input}>
                <InputLabel htmlFor="outlined-adornment-password"
                            error={!!(formik.touched.password && formik.errors.password)}>
                    Confirm password
                </InputLabel>

                <OutlinedInput
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    type={showConfirmPassword ? 'text' : 'password'}
                    error={!!(formik.touched.password && formik.errors.password)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Confirm password"
                />

                {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                    <div className={style.validation}>{formik.errors.confirmPassword}</div>}

            </FormControl>

            <Button className={style.button} variant="outlined" type="submit">SIGN IN</Button>
        </form>
    )
};