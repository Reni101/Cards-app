import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import style from './Headers.module.css'
import black_logo from '../../assets/webLogo/pink_punk_black.svg'
import {Button} from '@mui/material';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch, useAppSelector} from '../../redux/Store';
import {SingOutTC} from '../../redux/Login-reducer';
import {useScrollPosition} from '../../hooks/useScrollPosition';


export const Headers = () => {

    const dispatch = useAppDispatch()
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.Login.isAuth)
    const userLogo = useAppSelector(state => state.ProfilePage.avatar)
    const userName = useAppSelector(state => state.ProfilePage.name)
    const navigate = useNavigate();

    const [nav, setNav] = useState(false)
    const scrollPosition = useScrollPosition();
    useEffect(() => {
        window.onwheel = (e) => {
            let scrollDirection = e.deltaY < 0
            scrollPosition > 10 && !scrollDirection ? setNav && setNav(true) : setNav && setNav(false)
        }
    }, [scrollPosition])


    const goSignUp = () => {
        navigate('/registration')
    }
    const goToProfile = () => {
        navigate('/profile')
    }

    const changeSignOut = async () => {
        await dispatch(SingOutTC())
        navigate('/')
    }

    return (
        <div className={nav ? `${style.header_box} ${style.scroll_active}` : style.header_box}>
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
                        <img onClick={goToProfile}
                             src={userLogo ? userLogo : 'https://my-engine.ru/modules/users/avatar.png'} alt="logo"/>
                    </div>
                    :
                    <Button className={style.button} variant="outlined" onClick={goSignUp} type="submit">
                        sign up
                    </Button>}

            </div>

        </div>
    );
};
