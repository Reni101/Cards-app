import React from 'react';
import {useNavigate} from 'react-router-dom';
import style from './Headers.module.css'
import black_logo from '../../assets/webLogo/pink_punk_black.svg'
import {Button} from '@mui/material';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../Redux/Store';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {SingOutTC} from '../login/loginReducer/LoginReducer';

export const Headers = () => {

    const dispatch = useAppDispatch()
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.Login.isAuth)
    const userLogo = useAppSelector(state => state.Profile.avatar)
    const userName = useAppSelector(state => state.Profile.name)

    const navigate = useNavigate();
    const goSignUp = () => {
        navigate('/registration')
    }

    const changeSignOut = async () => {
       await dispatch(SingOutTC())
        navigate('/')
    }

    return (
        <div className={style.header_box}>
            <div className={style.website_logo}>
                <img src={black_logo} alt="logo is late"/>
            </div>
            <div className={style.header_wrapper}>
                {isAuth
                    ?
                    <div className={style.user_info}>
                        <Button className={style.button} variant="outlined" onClick={changeSignOut} type="submit">
                            sign out
                        </Button>
                        <div className={style.user_name}>{userName}</div>
                        <img src={userLogo ? userLogo : "https://my-engine.ru/modules/users/avatar.png"} alt="logo"/>
                    </div>
                    :
                    <Button className={style.button} variant="outlined" onClick={goSignUp} type="submit">
                        sign up
                    </Button>}
            </div>
        </div>
    );
};
