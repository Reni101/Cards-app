import React, {useEffect} from 'react';
import styleProfile from './ProfilePage.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Navigate} from "react-router-dom";
import {EditProfileName} from "./EditProfileName/editProfileName";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const ProfilePage = () => {

    const profileName = useAppSelector<string>(state => state.ProfilePage.profileName)
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
                <a href="/">
                    <ArrowBackIcon style={{width: "19px", height: "17px", position: "relative", top: "3px"}}/>
                    Back to Packs List
                </a>
            </div>
            <div className={styleProfile.wrapper}>
                <h2 className={styleProfile.title}>Personal Information</h2>
                <img src="" alt=""/>
                <EditProfileName NickName={profileName}/>
                <div>Blablabla@tut.by</div>

                <button className={styleProfile.LogOut}>Log out</button>


            </div>
        </div>
    );
};

