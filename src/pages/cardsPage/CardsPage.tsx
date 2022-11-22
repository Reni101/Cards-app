import React from 'react';
import style from './CardsPage.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {packsRoute} from '../../common/paths/Paths';
import {useNavigate} from 'react-router-dom';
import {MyCards} from './myCards/MyCards';
import {OtherCards} from './otherCards/OtherCards';

export const CardsPage = () => {

    const navigate = useNavigate()

    const goToPacks = () => {
        navigate(packsRoute)
    }

    return (
        <div className={style.all_wrapper_cards}>
            <div className={style.go_to_pack_list} onClick={goToPacks}>
                <ArrowBackIcon style={{height: '15px'}}/>
                Back to Packs List
            </div>
            <div>
                <MyCards/>
                <OtherCards/>
            </div>
        </div>
    );
};
