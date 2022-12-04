import React from 'react';
import styleProfile from './ProfilePage.module.css'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {Navigate, useNavigate} from 'react-router-dom';
import {EditProfileName} from './EditProfileName/editProfileName';
import LogoutIcon from '@mui/icons-material/Logout';
import {Slide} from 'react-awesome-reveal';
import {Button, LinearProgress} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {requestStatusType} from '../../AppReducer';

import {SingOutTC} from '../login/loginReducer/LoginReducer';
import {Paths} from '../../common/paths/Paths';

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
        navigate(Paths.loginRoute)
    }
    const goToPacks = () => {
        navigate(Paths.packsRoute)
    }
    if (!isAuth) {
        return <Navigate to={Paths.loginRoute}/>
    }


    return (
        <Slide direction={'up'} >
            <div className={styleProfile.all_wrapper_profile}>
                    <div className={styleProfile.Link_block} onClick={goToPacks}>
                        <ArrowBackIcon style={{height: '15px'}}/>
                        Back to Packs List
                    </div>

                <div className={styleProfile.wrapper_profile}>
                    {status === 'loading' && <div><LinearProgress color="primary"/></div>}


                    <h2 className={styleProfile.title}>Personal Information</h2>
                    <img src={avatar ? avatar : 'https://my-engine.ru/modules/users/avatar.png'} alt=""/>
                    <EditProfileName profileName={profileName}/>
                    <div className={styleProfile.email}>{email}</div>


                    <Button style={{marginBottom: '30px'}} variant="outlined" onClick={logOutHandler} type="submit">
                        <LogoutIcon/> Log out
                    </Button>

                </div>
            </div>
        </Slide>
    );
};

