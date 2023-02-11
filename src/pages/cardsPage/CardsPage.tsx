import React from 'react';
import style from './CardsPage.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Paths} from '../../common/paths/Paths';
import {Navigate, useNavigate} from 'react-router-dom';
import {Cards} from './cards/Cards';
import {useAppSelector} from "../../Redux/Store";


export const CardsPage = () => {

    const isAuth = useAppSelector(state => state.Login.isAuth)

    const navigate = useNavigate()
    const goToPacks = () => {
        navigate(Paths.packsRoute)
    }

    if (!isAuth) {
        return <Navigate to={Paths.loginRoute}/>
    }
    return (
        <div className={style.all_wrapper_cards}>
            <div className={style.go_to_pack_list} onClick={goToPacks}>
                <ArrowBackIcon style={{height: '15px'}}/>
                Back to Packs List
            </div>
            <div className={style.wrapper_cards}>
                <Cards/>
            </div>
        </div>
    );
};
