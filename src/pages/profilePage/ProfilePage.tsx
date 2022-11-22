import React from 'react';
import styleProfile from './ProfilePage.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Navigate, useNavigate} from "react-router-dom";
import {EditProfileName} from "./EditProfileName/editProfileName";
import LogoutIcon from '@mui/icons-material/Logout';
import {Slide} from "react-awesome-reveal";
import {Button, LinearProgress} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {requestStatusType} from "../../AppReducer";
import {setCardsPackTC} from "../packsPage/packsReducer";
import {
    changeMaxCardsInPackTC,
    changeMinCardsInPackTC,
    changePageCountPackTC,
    changePageTC, changeShowMyPacksTC, sortPacksNameTC
} from "../packsPage/queryParamsPacksReducer";


export const ProfilePage = () => {

    const profileName = useAppSelector(state => state.ProfilePage.name)
    const email = useAppSelector(state => state.ProfilePage.email)
    const avatar = useAppSelector(state => state.ProfilePage.avatar)
    const user_id = useAppSelector(state => state.ProfilePage.user_id)
    const isAuth = useAppSelector(state => state.Login.isAuth)
    const status = useAppSelector<requestStatusType>(state => state.App.status)


    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const logOutHandler = async () => {
        await dispatch(setCardsPackTC())
        // navigate('/')
    }
    if (!isAuth) {
        return <Navigate to={"/"}/>
    }


    return (
        <Slide direction={'up'} className={styleProfile.all_wrapper_profile}>

            <div className={styleProfile.Link_block}>
                <a href="/"> <ArrowBackIcon style={{height: "15px"}}/> Back to Packs List </a>
            </div>

            <div className={styleProfile.wrapper_profile}>
                {status === "loading" && <div><LinearProgress color="secondary"/></div>}


                <h2 className={styleProfile.title}>Personal Information</h2>
                <img src={avatar ? avatar : "https://my-engine.ru/modules/users/avatar.png"} alt=""/>
                <EditProfileName profileName={profileName}/>
                <div className={styleProfile.email}>{email}</div>


                <Button style={{marginBottom: "30px"}} variant="outlined" onClick={logOutHandler} type="submit">
                    <LogoutIcon/> Log out
                </Button>
                <button onClick={()=>{dispatch(changePageTC(2))}}>page 2</button>
                <button onClick={()=>{dispatch(changeMinCardsInPackTC(5))}}>min 5</button>
                <button onClick={()=>{dispatch(changeMaxCardsInPackTC(10))}}>max 10</button>
                <button onClick={()=>{dispatch(changePageCountPackTC(5))}}>pageCount 5</button>
                <button onClick={()=>{dispatch(sortPacksNameTC("eng"))}}>sort "eng"</button>
                <button onClick={()=>{dispatch(changeShowMyPacksTC(user_id))}}>Show my packs</button>

            </div>
        </Slide>
    );
};

