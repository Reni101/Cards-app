import React, {ChangeEvent} from 'react';
import style from './FilterMyOrAll.module.css'
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {changeShowMyPacksAC} from "../../PacksReducer";
import {useSearchParams} from 'react-router-dom';

export const FilterMyOrAll = () => {
    const user_idFromProfile = useAppSelector(state => state.ProfilePage.user_id)
    const user_idQuery = useAppSelector(state => state.Packs.user_id)
    const dispatch = useAppDispatch()



    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('user_id') || '';

    const MyPacks = () => {
        setSearchParams({user_id: user_idFromProfile})
        dispatch(changeShowMyPacksAC(user_idFromProfile))

    }
    const AllPacks = () => {
        setSearchParams({user_id: ""})
        dispatch(changeShowMyPacksAC(""))

    }

    return (
        <div className={style.all_wrapper_filter_my_or_all}>
            <div className={style.title_show_packs_cards}>
                Show packs cards
            </div>
            <div className={style.buttons_wrapper}>
                <div className={style.item_box}>
                    <Button className={style.button} variant={
                        searchQuery ? "contained" : "outlined"} type="submit"
                            onClick={MyPacks}>My</Button>
                </div>
                <div className={style.item_box}>
                    <Button className={style.button} variant={
                        searchQuery ? "outlined" : "contained"} type="submit"
                            onClick={AllPacks}>All</Button>
                </div>
            </div>
        </div>
    );
};

