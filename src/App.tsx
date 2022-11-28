import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import {LoginPage} from './pages/login/LoginPage';
import {NotFoundPage} from './pages/notFoudPage/NotFoundPage';


import {ProfilePage} from './pages/profilePage/ProfilePage';
import {RegistrationPage} from './pages/registrationPage/RegistrationPage';
import {Headers} from './pages/headers/Headers';
import {ForgotPasswordPage} from './pages/passwordRecoveryPage/forgotPasswordPage/ForgotPasswordPage';
import {CheckEmailPage} from './pages/passwordRecoveryPage/checkEmailPage/checkEmailPage';
import {NewPasswordPage} from './pages/passwordRecoveryPage/newPasswordPage/NewPasswordPage';
import {useAppDispatch, useAppSelector} from './hooks/hooks';
import {initializedAppTC} from './AppReducer';
import {ErrorSnackbar} from './common/errorSnackbar/ErrorSnackbar';
import {ExampleAnimation} from './common/lottieAnimation/LottieAnimation';
import {
    cardsRoute,
    checkEmailRoute,
    forgotPassRoute, learnRoute,
    loginRoute,
    notFoundRoute, packsRoute,
    profileRoute,
    registrationRoute,
    setNewPassRoute
} from './common/paths/Paths';
import {PacksPage} from './pages/packsPage/PacksPage';
import {CardsPage} from './pages/cardsPage/CardsPage';
import {LearnPage} from "./pages/learn/LearnPage";


function App() {
    const dispatch = useAppDispatch()
    const initialized = useAppSelector(state => state.App.initialized)



    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])


    // если инициализация провалилась => редирект на логин
    if (initialized) {//!isInitialized пока не прошла инициализация показывать крутилку
        return <div className="flex_for_lottie">
            <div className="app_lottie_animation_wrapper"><ExampleAnimation/></div>
        </div>
    }
    return (
        <>
            <ErrorSnackbar/>
            <Headers/>
            <Routes>
                <Route path={loginRoute} element={<LoginPage/>}/>
                <Route path={notFoundRoute} element={<NotFoundPage/>}/>
                <Route path={profileRoute} element={<ProfilePage/>}/>
                <Route path={registrationRoute} element={<RegistrationPage/>}/>
                <Route path={forgotPassRoute} element={<ForgotPasswordPage/>}/>
                <Route path={checkEmailRoute} element={<CheckEmailPage/>}/>
                <Route path={setNewPassRoute} element={<NewPasswordPage/>}/>
                <Route path={packsRoute} element={<PacksPage/>}/>
                <Route path={cardsRoute} element={<CardsPage/>}/>
                <Route path={learnRoute} element={<LearnPage/>}/>


                <Route path="*" element={<Navigate to={notFoundRoute}/>}/>
            </Routes>
        </>
    );
}

export default App;
