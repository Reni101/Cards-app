import React from 'react';
import style from './AddNewPack.module.css'
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {addNewCardPage} from '../../../common/paths/Paths';

export const AddNewPack = () => {
    const navigate = useNavigate()

    const goToAddNewPack =()=> {
        navigate(addNewCardPage)
    }

    return (
        <div className={style.all_wrapper_add_new_pack}>
            <h2>Packs list</h2>
            <div className={style.item_box}>
                <Button className={style.button} onClick={goToAddNewPack} variant="outlined" type="submit">Add new packs</Button>
            </div>
        </div>
    );
};
