import React, {ReactNode, useState} from 'react';
import {BasicModal} from "../../../common/modal/BasicModal";
import {Button, Checkbox} from "@mui/material";
import style from "../addNewPack/AddNewPack.module.css";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {DeletePackTC} from "../PacksReducer";
import s from './DeletePackModal.module.css'
import {useSearchParams} from "react-router-dom";

type DeletePackModalType = {
    children: ReactNode
    id: string
    name: string
}

export const DeletePackModal = ({children, id, name}: DeletePackModalType) => {

    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQueryUserId = searchParams.get('user_id') || '';

    const status = useAppSelector(state => state.App.status)
    const [open, setOpen] = React.useState(false);


    const deletePackClick = async (pack_id: string) => {
        await dispatch(DeletePackTC(pack_id,searchQueryUserId))
        setOpen(false)
    }

    const HandlerCancel = () => {
        setOpen(false)
    }

    return (
        <BasicModal childrenBtn={children} open={open} setOpen={setOpen} name={'Delete Pack'}>
            <div>
                <div className={s.textDelete}>
                    Do you really want to remove <span style={{fontWeight: '600'}}>{name}</span>? All cards will be deleted.
                </div>
                <div className={s.blockBtn}>
                    <Button onClick={HandlerCancel} className={style.button} variant="outlined"
                            type="submit">Cancel</Button>
                    <Button style={{color: 'white', backgroundColor: 'red',}} onClick={() => deletePackClick(id)}
                            className={style.button} variant="outlined" type="submit"
                            disabled={status === "loading"}>Delete</Button>
                </div>
            </div>
        </BasicModal>
    );
};
