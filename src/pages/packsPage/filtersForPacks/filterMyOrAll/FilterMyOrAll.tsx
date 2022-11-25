import React from 'react';
import style from './FilterMyOrAll.module.css'
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {changeShowMyPacksAC} from "../../PacksReducer";

export const FilterMyOrAll = () => {
    const user_idFromProfile = useAppSelector(state => state.ProfilePage.user_id)
    const user_idQuery = useAppSelector(state => state.Packs.query.user_id)
    const dispatch = useAppDispatch()
    const MyPacks = () => {
        dispatch(changeShowMyPacksAC(user_idFromProfile))
    }
    const AllPacks = () => {
        dispatch(changeShowMyPacksAC(""))
    }

    return (
        <div className={style.all_wrapper_filter_my_or_all}>
            <div className={style.title_show_packs_cards}>
                Show packs cards
            </div>
            <div className={style.buttons_wrapper}>
                <div className={style.item_box}>
                    <Button className={style.button} variant={user_idQuery ? "contained": "outlined"} type="submit" onClick={MyPacks}>My</Button>
                </div>
                <div className={style.item_box}>
                    <Button className={style.button} variant={user_idQuery ? "outlined": "contained"} type="submit" onClick={AllPacks}>All</Button>
                </div>
            </div>
        </div>
    );
};

