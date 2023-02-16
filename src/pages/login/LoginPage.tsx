import React, {useState} from 'react';
import {
    Button,
    FormControl,
    FormControlLabel,
    InputAdornment,
    InputLabel,
    LinearProgress,
    OutlinedInput,
    TextField
} from "@mui/material";
import * as Yup from 'yup';
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {IOSSwitch} from "../../common/iosSwitch/IOSSwitch";
import {Navigate, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/Store";
import {requestStatusType} from "../../redux/App-reducer";
import {useFormik} from "formik";
import {singInTC} from "../../redux/Login-reducer";
import {Slide} from 'react-awesome-reveal';
import style from './Login.module.css'

type InitialValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const LoginPage = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector<boolean>(state => state.Login.isAuth)
    const status = useAppSelector<requestStatusType>(state => state.App.status)

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: true
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('invalid email address').required('required'),
            password: Yup.string()
                .min(8, 'must be 8 characters long')
                .required('required')
        }),
        onSubmit: (values: InitialValuesType) => {
            dispatch(singInTC(values))
        }
    })


    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (<Slide direction={'down'}>
            <div className={style.all_wrapper_login}>
                <div className={style.wrapper_login}>
                    {status === 'loading' && <LinearProgress color="primary"/>}
                    <h2>Sing in</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={style.inputEmail}>
                            <TextField
                                fullWidth={true}
                                name="email"
                                onChange={formik.handleChange}
                                label="Email"
                                variant="outlined"
                                error={!!(formik.touched.email && formik.errors.email)}
                            />

                            {formik.touched.email && formik.errors.email &&
                                <div className={style.validation}>{formik.errors.email}</div>}
                        </div>

                        <FormControl fullWidth={true} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password"
                                        error={!!(formik.touched.password && formik.errors.password)}
                            >Password</InputLabel>

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


                        <FormControlLabel
                            control={<IOSSwitch sx={{mx: 2}}/>}
                            checked={formik.values.rememberMe}
                            label="Remember me"
                            {...formik.getFieldProps('rememberMe')}
                        />
                        <div className={style.fagot_pass}>
                            <NavLink to="/forgot-password">
                                Fagot Password ?
                            </NavLink>
                        </div>

                        <Button
                            variant="outlined"
                            type="submit">
                            LOGIN
                        </Button>

                    </form>
                    <div className={style.haveAccount}>
                        <div>Need an account?</div>
                        <NavLink to={'/registration'}>Sing Up</NavLink>
                    </div>
                </div>
            </div>
        </Slide>
    );
};

