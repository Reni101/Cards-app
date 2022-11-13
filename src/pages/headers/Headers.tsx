import React from 'react';
import {NavLink} from "react-router-dom";

export const Headers = () => {
    return (
        <div>
            <div className={"HeaderBox"} style={{height:"60px"}}>
                <NavLink to={"/login"}> login</NavLink>
                <NavLink to={"/notFound"}> notFound</NavLink>
                <NavLink to={"/newPassword"}> newPassword</NavLink>
                <NavLink to={"/PasswordRecovery"}> PasswordRecovery</NavLink>
                <NavLink to={"/profile"}> profile</NavLink>
                <NavLink to={"/registration"}> registration</NavLink>
                <NavLink to={"/test"}> test</NavLink>
                <NavLink to={"/registration"}> registration</NavLink>
            </div>
        </div>
    );
};
