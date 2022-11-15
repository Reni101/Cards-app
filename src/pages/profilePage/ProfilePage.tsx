import React, {useEffect} from 'react';
import styleProfile from './ProfilePage.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Navigate} from "react-router-dom";
import {EditProfileName} from "./EditProfileName/editProfileName";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';

export const ProfilePage = () => {

    const profileName = useAppSelector<string>(state => state.ProfilePage.name)
    const email = useAppSelector<string>(state => state.ProfilePage.email)
    const avatar = useAppSelector(state => state.ProfilePage.avatar)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (false) { //!loggedIn
            //;
        }
        //dispatch(setProfile)
    }, [])

    if (false) { //!loggedIn
        return <Navigate to='/login'/>
    }
    return (
        <div className={styleProfile.ProfilePage}>
            <div className={styleProfile.Link_block}>
                <a href="/"> <ArrowBackIcon style={{height: "15px"}}/> Back to Packs List </a>
            </div>
            <div className={styleProfile.wrapper}>
                <h2 className={styleProfile.title}>Personal Information</h2>
                <img src={avatar ? avatar : "https://my-engine.ru/modules/users/avatar.png"} alt=""/>
                <EditProfileName profileName={profileName}/>
                <div className={styleProfile.Email}>{email}</div>

                <button className={styleProfile.LogOut}><LogoutIcon/> Log out</button>


            </div>
        </div>
    );
};

