import React, {useEffect} from 'react';
import styleProfile from './ProfilePage.module.css'
import {useAppDispatch} from "../../hooks/hooks";
import {Navigate} from "react-router-dom";
import {EditProfileName} from "./EditProfileName/editProfileName";

export const ProfilePage = () => {
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
            <div><a href="/" className={styleProfile.back_link}> Back to Packs List</a></div>
            <div className={styleProfile.wrapper}>
                <h2 className={styleProfile.title}>Personal Information</h2>

                <img src="" alt="avatar"/>
                <EditProfileName/>
                <div>email</div>

                <button>Log out</button>


            </div>
        </div>
    );
};

