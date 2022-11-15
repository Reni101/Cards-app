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
import {ForgotPasswordPage} from "./pages/forgotPasswordPage/ForgotPasswordPage";


function App() {
    useEffect(() => {
        //dispatch(initializeAppTC()) написать санку, которая
        // будет проверять инициализацию и если да => сетать что придет из респонса(профаил)
    }, [])

    if (false) {//!isInitialized пока не прошла инициализация показывать крутилку
        return <div
          >

        </div>
    }
    // если инициализация провалилась => редирект на логин

    return (
        <>
            <Headers/>
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/notFound' element={<NotFoundPage/>}/>
                <Route path='/newPassword' element={<EnteringNewPassword/>}/>
                <Route path='/PasswordRecovery' element={<PasswordRecoveryPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/registration' element={<RegistrationPage/>}/>
                <Route path='/test' element={<TestPage/>}/>
                <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
                <Route path="*" element={<Navigate to='/notFound'/>}/>

            </Routes>
        </>
    );
}

export default App;
