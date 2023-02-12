import React from 'react';
import style from './FilterMyOrAll.module.css'
import {Button} from '@mui/material';
import {changeShowMyPacksAC} from "../../../../redux/Packs-reducer";
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../../redux/Store";

export const FilterMyOrAll = () => {
    const dispatch = useAppDispatch()
    const user_idFromProfile = useAppSelector(state => state.ProfilePage.user_id)


    const [searchParams, setSearchParams] = useSearchParams();
    const searchQueryName = searchParams.get('search') || '';
    const searchQueryUserId = searchParams.get('user_id') || '';
    const searchQueryMin = searchParams.get('min') || '';
    const searchQueryMax = searchParams.get('max') || '';

    const MyPacks = () => {
        const params = {
            search: searchQueryName,
            user_id: user_idFromProfile,
            min: searchQueryMin,
            max: searchQueryMax
        }
        setSearchParams(params)
        dispatch(changeShowMyPacksAC({user_id: params.user_id}))

    }
    const AllPacks = () => {
        const params = {
            search: searchQueryName,
            user_id: '',
            min: searchQueryMin,
            max: searchQueryMax
        }
        setSearchParams(params)
        dispatch(changeShowMyPacksAC({user_id: params.user_id}))
    }

    return (
        <div className={style.all_wrapper_filter_my_or_all}>
            <div className={style.title_show_packs_cards}>
                Show packs cards
            </div>
            <div className={style.buttons_wrapper}>
                <div className={style.item_box}>
                    <Button className={style.button} variant={
                        searchQueryUserId ? "contained" : "outlined"} type="submit"
                            onClick={MyPacks}>My</Button>
                </div>
                <div className={style.item_box}>
                    <Button className={style.button} variant={
                        searchQueryUserId ? "outlined" : "contained"} type="submit"
                            onClick={AllPacks}>All</Button>
                </div>
            </div>
        </div>
    );
};

