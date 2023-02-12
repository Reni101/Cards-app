import React from 'react';
import style from './ResettingAllFilters.module.css'
import FilterListOffSharpIcon from '@mui/icons-material/FilterListOffSharp';
import {changeMaxAC, changeMinAC, changeShowMyPacksAC, changeSortPacksAC, sortPacksNameAC} from "../../../../redux/Packs-reducer";
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../../redux/Store";

export const ResettingAllFilters = () => {
    const dispatch = useAppDispatch()
    const maxCardsCount = useAppSelector(state => state.Packs.maxCardsCount)
    const [searchParams, setSearchParams] = useSearchParams();


    const ResetAllFiltersParams = () => {

        const params = {
            search: '',
            user_id: '',
            min: '0',
            max: maxCardsCount.toString()
        }
        setSearchParams(params)
        dispatch(changeMinAC({min:Number(params.min)}))
        dispatch(changeMaxAC({max:Number(params.max)}))
        dispatch(changeShowMyPacksAC({user_id:params.user_id}))
        dispatch(sortPacksNameAC({packName:params.search}))
        dispatch(changeSortPacksAC({sortPacks:''}))
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
