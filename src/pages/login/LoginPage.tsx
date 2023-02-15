import React, {useState} from 'react';
import {FormikHelpers, useFormik} from 'formik';
import * as Yup from 'yup';
import style from './Login.module.css'
import {
    Button,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    LinearProgress,
    OutlinedInput,
    TextField
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {Navigate, NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../redux/Store';
import {singInTC} from '../../redux/Login-reducer';
import {Slide} from 'react-awesome-reveal';
import {requestStatusType} from '../../redux/App-reducer';
import {IOSSwitch} from "../../common/iosSwitch/IOSSwitch";


interface InitialValuesType {
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

    const rememberMeHandler = () => {
        formik.setFieldValue('rememberMe', !formik.values.rememberMe)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('invalid email address').required('required'),
            password: Yup.string()
                .min(7, 'must be 7 characters long')
                .required('required')
        }),
        onSubmit: (values: InitialValuesType, {setSubmitting, setStatus}: FormikHelpers<InitialValuesType>) => {
            dispatch(singInTC(values))
        }
    })

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <Slide direction={'down'}>
            <div className={style.all_wrapper_login}>
                <div className={style.wrapper_login}>
                    {status === 'loading' && <div className="loading"><LinearProgress color="primary"/></div>}
                    <div className={style.sing_in}>Sing in</div>
                    <div className={style.form_container}>
                        <form className={style.gm}>
                            <div className={style.item_box}>
                                <TextField
                                    id="outlined-basic"
                                    label="email"
                                    type="email"
                                    fullWidth={true}
                                    {...formik.getFieldProps("email")}
                                    color={formik.touched.email && formik.errors.email ? 'error' : 'success'}
                                    variant="outlined"/>
                                {formik.touched.email && formik.errors.email ? (
                                    <div className={style.validation}>{formik.errors.email}</div>
                                ) : null}
                            </div>

                            <div className={style.item_box}>
                                <FormControl variant="outlined" fullWidth={true}>
                                    <InputLabel htmlFor="outlined-adornment-password"
                                                color={formik.touched.password && formik.errors.password ? 'error' : 'success'}
                                    >Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        {...formik.getFieldProps("password")}
                                        label="Password"
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
                                    />
                                </FormControl>
                                {formik.touched.password && formik.errors.password ? (
                                    <div className={style.validation}>{formik.errors.password}</div>
                                ) : null}
                            </div>
                            <div className={style.item_box}>
                                <FormControlLabel
                                    control={<IOSSwitch sx={{mx: 2}}/>}
                                    name="rememberMe"
                                    onChange={rememberMeHandler}
                                    label="Remember me"
                                />
                            </div>
                        </form>
                        <div className={style.fagot_pass}>
                            <NavLink to="/forgot-password">
                                Fagot Password ?
                            </NavLink>
                        </div>
                        <form onSubmit={formik.handleSubmit} className={style.form}>
                            <div className={style.item_box}>
                                <Button className={style.button} variant="outlined" type="submit">LOGIN</Button>
                            </div>
                        </form>
                        <div className={style.haveAccount}>Already have an account?</div>
                        <div className={style.goToSingUp}>
                            <NavLink to={'/registration'}>Sing Up</NavLink>
                        </div>
                    </div>
                </div>
            </div>

        </Slide>
    );
}


