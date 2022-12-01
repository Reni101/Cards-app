import React from 'react';
import style from './AddNewPack.module.css'
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {AddPackTC} from '../PacksReducer';
import {AddPackModal} from "../packModal/AddPackModal";


export const AddNewPack = () => {

    return (
        <div className={style.all_wrapper_add_new_pack}>
            <h2>Packs list</h2>
            <div className={style.item_box}>
                <AddPackModal>
                    <Button className={style.button} variant="outlined" type="submit">Add new pack</Button>
                </AddPackModal>

            </div>
        </div>
    );
};
