import React from 'react';
import style from './ResettingAllFilters.module.css'
import FilterListOffSharpIcon from '@mui/icons-material/FilterListOffSharp';
import {useAppDispatch} from "../../../../hooks/hooks";
import {
    changeMaxAC,
    changeMinAC,
    changeShowMyPacksAC, changeSortPacksAC,
    sortPacksNameAC
} from "../../PacksReducer";
import {useSearchParams} from "react-router-dom";

export const ResettingAllFilters = () => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const ResetAllFiltersParams = () => {
        dispatch(changeMinAC(0))
        dispatch(changeMaxAC(0))
        dispatch(changeShowMyPacksAC(""))
        dispatch(sortPacksNameAC(""))
        dispatch(changeSortPacksAC(""))
        setSearchParams(undefined)

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
