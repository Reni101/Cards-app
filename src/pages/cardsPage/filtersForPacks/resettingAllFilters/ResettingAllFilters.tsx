import React from 'react';
import style from './ResettingAllFilters.module.css'
import FilterListOffSharpIcon from '@mui/icons-material/FilterListOffSharp';

export const ResettingAllFilters = () => {
    return (
        <div className={style.all_wrapper_res_all_filters}>
            <div className={style.title_res_all}>
                Resetting filters
            </div>
            <div className={style.icon_wrapper}>
                <FilterListOffSharpIcon color={'primary'}/>
            </div>
        </div>
    );
};
