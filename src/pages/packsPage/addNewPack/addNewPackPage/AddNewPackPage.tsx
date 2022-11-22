import React from 'react';
import style from './AddNewPackPage.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {packsRoute} from '../../../../common/paths/Paths';
import {useNavigate} from 'react-router-dom';
import container from '../../../../common/commonStyles/container.module.css'
import {Button} from '@mui/material';

export const AddNewPackPage = () => {

    const navigate = useNavigate()

    const goToPacks = () => {
        navigate(packsRoute)
    }
    return (
        <div className={style.all_wrapper_add_pack_page}>
            <div className={style.go_to_pack_list} onClick={goToPacks}>
                <ArrowBackIcon style={{height: '15px'}}/>
                Back to Packs List
            </div>
            <div className={container.contain}>
                <h2 className={style.title_add_new_pack}>Name Pack</h2>
                <div className={style.add_new_card_block}>
                    <div className={style.empty}>This pack is empty. Click add new card to fill this pack</div>
                    <Button className={style.button} variant="outlined" type="submit">
                        Add new card
                    </Button>
                </div>
            </div>
        </div>
    );
};
