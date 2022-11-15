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

                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/registration' element={<RegistrationPage/>}/>
                <Route path='/test' element={<TestPage/>}/>


                <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
                <Route path='/check-email-page' element={<CheckEmailPage/>}/>
                <Route path='/new-password/:token' element={<NewPasswordPage/>}/>



                <Route path="*" element={<Navigate to='/notFound'/>}/>

            </Routes>
        </>
    );
}

export default App;
