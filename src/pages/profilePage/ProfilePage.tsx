import React, {useEffect} from 'react';
import styleProfile from './ProfilePage.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Navigate, useNavigate} from "react-router-dom";
import {EditProfileName} from "./EditProfileName/editProfileName";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import {Slide} from "react-awesome-reveal";
import {Button, LinearProgress} from "@mui/material";

import {requestStatusType} from "../../AppReducer";
import style from "../headers/Headers.module.css";
import {SingOutTC} from "../login/loginReducer/LoginReducer";

export const ProfilePage = () => {

    const profileName = useAppSelector(state => state.ProfilePage.name)
    const email = useAppSelector(state => state.ProfilePage.email)
    const avatar = useAppSelector(state => state.ProfilePage.avatar)
    const isAuth = useAppSelector(state => state.Login.isAuth)
    const status = useAppSelector<requestStatusType>(state => state.App.status)


    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const logOutHandler = async () => {
        await dispatch(SingOutTC())
        navigate('/')
    }



    return (
        <Slide direction={'up'}>
            {status === 'loading' && <div className="loading"><LinearProgress color="secondary"/></div>}

            {/*<div className={styleProfile.Link_block}>*/}
            {/*    <a href="/"> <ArrowBackIcon style={{height: "15px"}}/> Back to Packs List </a>*/}
            {/*</div>*/}

            <div className={styleProfile.wrapper_profile}>


                <h2 className={styleProfile.title}>Personal Information</h2>
                <img src={avatar ? avatar : "https://my-engine.ru/modules/users/avatar.png"} alt=""/>
                <EditProfileName profileName={profileName}/>
                <div className={styleProfile.email}>{email}</div>


                <Button className={styleProfile.logOut} variant="outlined" onClick={logOutHandler} type="submit">
                    <LogoutIcon/> Log out
                </Button>

            </div>
        </Slide>
    );
};

