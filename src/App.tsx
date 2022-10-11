import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import {NotFoundPage} from "./pages/NotFoundPage";
import {EnteringNewPassword} from "./pages/EnteringNewPassword";
import {PasswordRecoveryPage} from "./pages/PasswordRecoveryPage";
import {ProfilePage} from "./pages/ProfilePage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {TestPage} from "./pages/TestPage";


function App() {
    return (
        <>
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
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
