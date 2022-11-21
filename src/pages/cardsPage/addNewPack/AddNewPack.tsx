import React from 'react';
import style from './AddNewPack.module.css'
import {Button} from '@mui/material';

export const AddNewPack = () => {
    return (
        <div className={style.all_wrapper_add_new_pack}>
            <h2>Packs list</h2>
            <div className={style.item_box}>
                <Button className={style.button} variant="outlined" type="submit">Add new packs</Button>
            </div>
        </div>
    );
};
