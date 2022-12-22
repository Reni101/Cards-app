import React, {ChangeEvent} from 'react';
import styleProfile from './ProfilePage.module.css'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {Navigate, useNavigate} from 'react-router-dom';
import {EditProfileName} from './EditProfileName/editProfileName';
import LogoutIcon from '@mui/icons-material/Logout';
import {Slide} from 'react-awesome-reveal';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PartyModeIcon from '@mui/icons-material/PartyMode';
import Button from '@mui/material/Button';
import {SingOutTC} from '../login/loginReducer/LoginReducer';
import {Paths} from '../../common/paths/Paths';
import {editProfileNameAvatarTC} from "./ProfilePagerReducer";
import {setErrorApp} from "../../AppReducer";
import defaultAvatar from '../../assets/default-avatar.png'

export const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const profileName = useAppSelector(state => state.ProfilePage.name)
    const email = useAppSelector(state => state.ProfilePage.email)
    const avatar = useAppSelector(state => state.ProfilePage.avatar)
    const isAuth = useAppSelector(state => state.Login.isAuth)


    const logOutHandler = async () => {
        await dispatch(SingOutTC())
        navigate(Paths.loginRoute)
    }
    const goToPacks = () => {
        navigate(Paths.packsRoute)
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 100000) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(editProfileNameAvatarTC({avatar: file64}))
                    //отправляет Base64 на сервак
                })
            } else {
                dispatch(setErrorApp('The file is too large'))
            }
        }
    }
    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    const errorHandler = () => {
        dispatch(setErrorApp('Incorrect photo'))
    }

    if (!isAuth) {
        return <Navigate to={Paths.loginRoute}/>
    }


    return (
        <Slide direction={'up'}>

            <div className={styleProfile.all_wrapper_profile}>

                <div className={styleProfile.Link_block} onClick={goToPacks}>
                    <ArrowBackIcon style={{height: '15px'}}/>
                    Back to Packs List
                </div>

                <div className={styleProfile.wrapper_profile}>
                    <h2 className={styleProfile.title}>Personal Information</h2>

                    <div className={styleProfile.profile_avatar}>
                        <img src={avatar ? avatar : defaultAvatar} alt="avatar"/>
                    </div>

                    <label className={styleProfile.avatarButton}>
                        <input type="file"
                               onError={errorHandler}
                               onChange={uploadHandler}
                               style={{display: 'none'}}
                               accept='image/*'/>


                        <IconButton component="span">
                            <PartyModeIcon/>
                        </IconButton>


                    </label>

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

