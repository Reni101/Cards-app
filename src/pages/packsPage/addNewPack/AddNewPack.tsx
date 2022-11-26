import React  from 'react';
import style from './AddNewPack.module.css'
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {AddPackTC} from '../PacksReducer';


export const AddNewPack = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.App.status)

    const AddNewPack = async () => {
            await dispatch(AddPackTC({name:"Sanya Luchshaya TC"}))
    }

    return (
        <div className={style.all_wrapper_add_new_pack}>
            <h2>Packs list</h2>
            <div className={style.item_box}>
                <Button className={style.button} onClick={AddNewPack} variant="outlined" type="submit" disabled={status === "loading"}>Add new pack</Button>
            </div>
        </div>
    );
};
