import React from 'react';
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../hooks/hooks";


export const CheckEmailPage = () => {
    const email = useAppSelector(store => store.ForgotPassword.email)
    return (
        <div>
            <div>
                <h2>Check Email</h2>
                <img src="" alt=""/>

                <div>We’ve sent an Email with instructions to {email}</div>
                <NavLink to={"/login"}> Try logging in </NavLink>
            </div>

        </div>
    );
};

