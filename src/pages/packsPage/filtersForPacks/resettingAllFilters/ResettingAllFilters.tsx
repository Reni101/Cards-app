import React from 'react';
import style from './ResettingAllFilters.module.css'
import FilterListOffSharpIcon from '@mui/icons-material/FilterListOffSharp';
import {useAppDispatch} from "../../../../hooks/hooks";
import {ResetAllQueryParamsTC} from "../../PacksReducer";

export const ResettingAllFilters = () => {
    const dispatch = useAppDispatch()

    const onclickHandler=()=>{
        dispatch(ResetAllQueryParamsTC())
    }
    return (
        <div className={style.all_wrapper_res_all_filters}>
            <div className={style.title_res_all}>
                Resetting filters
            </div>
            <div className={style.icon_wrapper} onClick={onclickHandler}>
                <FilterListOffSharpIcon color={'primary'}/>
            </div>
        </div>
    );
};
