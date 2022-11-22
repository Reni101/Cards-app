import React from 'react';
import style from './FilterMyOrAll.module.css'
import {Button} from '@mui/material';

export const FilterMyOrAll = () => {
    return (
        <div className={style.all_wrapper_filter_my_or_all}>
            <div className={style.title_show_packs_cards}>
                Show packs cards
            </div>
            <div className={style.buttons_wrapper}>
                <div className={style.item_box}>
                    <Button className={style.button} variant="outlined" type="submit">My</Button>
                </div>
                <div className={style.item_box}>
                    <Button className={style.button} variant="outlined" type="submit">All</Button>
                </div>
            </div>
        </div>
    );
};

