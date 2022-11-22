import React from 'react';
import style from './NamePack.module.css';
import {Button} from '@mui/material';


export const NamePack = () => {

    return (
        <div className={style.name_pack_all_wrapper}>
            <h2 className={style.title_my_cards}>My Pack</h2>
            <Button className={style.button} variant="outlined" type="submit">
                Add new card
            </Button>
        </div>
    );
};

