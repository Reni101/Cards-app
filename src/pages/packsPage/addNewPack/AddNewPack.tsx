import React from 'react';
import style from './AddNewPack.module.css'
import {Button} from '@mui/material';
import {AddPackModal} from "../packModal/AddPackModal";
import {useAppSelector} from "../../../redux/Store";


export const AddNewPack = () => {
    const status = useAppSelector(state => state.App.status)

    return (
        <div className={style.all_wrapper_add_new_pack}>
            <h2>Packs list</h2>
            <div className={style.item_box}>
                <AddPackModal>
                    <Button className={style.button}
                            disabled={status === "loading"}
                            variant="outlined"
                            type="submit">Add new pack</Button>
                </AddPackModal>

            </div>
        </div>
    );
};
