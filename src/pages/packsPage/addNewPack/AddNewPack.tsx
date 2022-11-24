import React  from 'react';
import style from './AddNewPack.module.css'
import {Button} from '@mui/material';
import {useAppDispatch} from '../../../hooks/hooks';
import {AddPackTC} from '../PacksReducer';


export const AddNewPack = () => {
    const dispatch = useAppDispatch()



    const AddNewPack =()=> {
            dispatch(AddPackTC({name:"Hello"}))
    }

    return (
        <div className={style.all_wrapper_add_new_pack}>
            <h2>Packs list</h2>
            <div className={style.item_box}>
                <Button className={style.button} onClick={AddNewPack} variant="outlined" type="submit">Add new packs</Button>
            </div>
        </div>
    );
};
