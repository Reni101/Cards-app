import React from 'react';
import style from './ResettingAllFilters.module.css'
import FilterListOffSharpIcon from '@mui/icons-material/FilterListOffSharp';
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {
    changeMinAC,
    changeShowMyPacksAC,
    sortPacksNameAC
} from "../../PacksReducer";

export const ResettingAllFilters = () => {
    const dispatch = useAppDispatch()
    const maxCard = useAppSelector(state => state.Packs.maxCardsCount)

    const ResetAllFiltersParams = () => {
        dispatch(changeMinAC(0))
        dispatch(changeMinAC(0))
        dispatch(changeShowMyPacksAC(""))
        dispatch(sortPacksNameAC(""))
    }
    return (
        <div className={style.all_wrapper_res_all_filters}>
            <div className={style.title_res_all}>
                Resetting filters
            </div>
            <div className={style.icon_wrapper} onClick={ResetAllFiltersParams}>
                <FilterListOffSharpIcon color={'primary'}/>
            </div>
        </div>
    );
};
