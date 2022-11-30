import React from 'react';
import style from './ResettingAllFilters.module.css'
import FilterListOffSharpIcon from '@mui/icons-material/FilterListOffSharp';
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import {
    changeMaxAC,
    changeMinAC,
    changeShowMyPacksAC, changeSortPacksAC,
    sortPacksNameAC
} from "../../PacksReducer";
import {useSearchParams} from 'react-router-dom';

export const ResettingAllFilters = () => {
    const dispatch = useAppDispatch()
    const maxCardsCount = useAppSelector(state => state.Packs.maxCardsCount)
    const [searchParams, setSearchParams] = useSearchParams();


    const ResetAllFiltersParams = () => {

        const params = {
            search:'',
            user_id:'',
            min:'0',
            max:maxCardsCount.toString()
        }
        setSearchParams(params)
        dispatch(changeMinAC(Number(params.min)))
        dispatch(changeMaxAC(Number(params.max)))
        dispatch(changeShowMyPacksAC(params.user_id))
        dispatch(sortPacksNameAC(params.search))
        dispatch(changeSortPacksAC(""))
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
