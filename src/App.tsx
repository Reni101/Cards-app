import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import {LoginPage} from './pages/login/LoginPage';
import {NotFoundPage} from './pages/notFoudPage/NotFoundPage';
import {ProfilePage} from './pages/profilePage/ProfilePage';
import {RegistrationPage} from './pages/registrationPage/RegistrationPage';
import {Headers} from './pages/headers/Headers';
import {ForgotPasswordPage} from './pages/passwordRecoveryPage/forgotPasswordPage/ForgotPasswordPage';
import {CheckEmailPage} from './pages/passwordRecoveryPage/checkEmailPage/CheckEmailPage';
import {NewPasswordPage} from './pages/passwordRecoveryPage/newPasswordPage/NewPasswordPage';
import {initializedAppTC} from './redux/App-reducer';
import {ErrorSnackbar} from './common/errorSnackbar/ErrorSnackbar';
import {ExampleAnimation} from './common/lottieAnimation/LottieAnimation';
import {Paths} from './common/paths/Paths';
import {PacksPage} from './pages/packsPage/PacksPage';
import {CardsPage} from './pages/cardsPage/CardsPage';
import {LearnPage} from "./pages/learn/LearnPage";
import Chat from "./pages/chatPage/Chat";
import {useAppDispatch, useAppSelector} from "./redux/Store";


function App() {
    const dispatch = useAppDispatch()
    const initialized = useAppSelector(state => state.App.initialized)

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])

    if (initialized) {
        return <div className="flex_for_lottie">
            <div className="app_lottie_animation_wrapper"><ExampleAnimation/></div>
        </div>
    }
    return (
        <>
            <ErrorSnackbar/>
            <Headers/>
            <Routes>
                <Route path={Paths.loginRoute} element={<LoginPage/>}/>
                <Route path={Paths.notFoundRoute} element={<NotFoundPage/>}/>
                <Route path={Paths.profileRoute} element={<ProfilePage/>}/>
                <Route path={Paths.registrationRoute} element={<RegistrationPage/>}/>
                <Route path={Paths.forgotPassRoute} element={<ForgotPasswordPage/>}/>
                <Route path={Paths.checkEmailRoute} element={<CheckEmailPage/>}/>
                <Route path={Paths.setNewPassRoute} element={<NewPasswordPage/>}/>
                <Route path={Paths.packsRoute} element={<PacksPage/>}/>
                <Route path={Paths.cardsRoute} element={<CardsPage/>}/>
                <Route path={Paths.learnRoute} element={<LearnPage/>}/>

                <Route path={Paths.chatRoute} element={<Chat/>}/>


                <Route path="*" element={<Navigate to={Paths.notFoundRoute}/>}/>
            </Routes>
        </>
    );
}

export default App;
