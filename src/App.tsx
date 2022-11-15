import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/login/LoginPage";
import {NotFoundPage} from "./pages/notFoudPage/NotFoundPage";
import {EnteringNewPassword} from "./pages/enteringNewPassword/EnteringNewPassword";
import {PasswordRecoveryPage} from "./pages/passwordRecoveryPage/PasswordRecoveryPage";
import {ProfilePage} from "./pages/profilePage/ProfilePage";
import {RegistrationPage} from "./pages/registrationPage/RegistrationPage";
import {TestPage} from "./pages/testPage/TestPage";
import {Headers} from "./pages/headers/Headers";
import {useAppDispatch, useAppSelector} from './hooks/hooks';
import {initializedAppTC, requestStatusType} from './AppReducer';
import {ErrorSnackbar} from './common/errorSnackbar/ErrorSnackbar';
import {LinearProgress} from '@mui/material';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './Redux/Store';


function App() {
    const dispatch = useAppDispatch()
    const initialized = useAppSelector(state => state.App.initialized)
    const status = useSelector<AppRootStateType, requestStatusType>(state => state.App.status)

    useEffect(() => {
        dispatch(initializedAppTC())
        // будет проверять инициализацию и если да => сетать что придет из респонса(профаил)
    }, [])

    if (!initialized) {//!isInitialized пока не прошла инициализация показывать крутилку
        return <div></div>
    }

    // если инициализация провалилась => редирект на логин

    return (
        <>
            <ErrorSnackbar/>
            {status === 'loading' && <div className="loading"><LinearProgress color="secondary"/></div>}
            <Headers/>
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
                <Route path='/notFound' element={<NotFoundPage/>}/>
                <Route path='/newPassword' element={<EnteringNewPassword/>}/>
                <Route path='/PasswordRecovery' element={<PasswordRecoveryPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/registration' element={<RegistrationPage/>}/>
                <Route path='/test' element={<TestPage/>}/>
                <Route path="*" element={<Navigate to='/notFound'/>}/>

            </Routes>
        </>
    );
}

export default App;
