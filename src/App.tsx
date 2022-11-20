import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/login/LoginPage";
import {NotFoundPage} from "./pages/notFoudPage/NotFoundPage";


import {ProfilePage} from "./pages/profilePage/ProfilePage";
import {RegistrationPage} from "./pages/registrationPage/RegistrationPage";
import {TestPage} from "./pages/testPage/TestPage";
import {Headers} from "./pages/headers/Headers";
import {ForgotPasswordPage} from "./pages/passwordRecoveryPage/forgotPasswordPage/ForgotPasswordPage";
import {CheckEmailPage} from "./pages/passwordRecoveryPage/checkEmailPage/checkEmailPage";
import {NewPasswordPage} from "./pages/passwordRecoveryPage/newPasswordPage/NewPasswordPage";
import {useAppDispatch, useAppSelector} from './hooks/hooks';
import {initializedAppTC} from './AppReducer';
import {ErrorSnackbar} from './common/errorSnackbar/ErrorSnackbar';
import {ExampleAnimation} from './common/lottieAnimation/LottieAnimation';




function App() {
    const dispatch = useAppDispatch()
    const initialized = useAppSelector(state => state.App.initialized)


    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])




    // если инициализация провалилась => редирект на логин
    if (initialized) {//!isInitialized пока не прошла инициализация показывать крутилку
        return <div className='flex_for_lottie'><div className='app_lottie_animation_wrapper'><ExampleAnimation/></div></div>
    }
    return (
        <>
            <ErrorSnackbar/>
            <Headers/>
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
                <Route path='/notFound' element={<NotFoundPage/>}/>

                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/registration' element={<RegistrationPage/>}/>
                <Route path='/test' element={<TestPage/>}/>


                <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
                <Route path='/check-email-page' element={<CheckEmailPage/>}/>
                <Route path='/set-new-password/:token' element={<NewPasswordPage/>}/>



                <Route path="*" element={<Navigate to='/notFound'/>}/>
            </Routes>

        </>
    );
}

export default App;
