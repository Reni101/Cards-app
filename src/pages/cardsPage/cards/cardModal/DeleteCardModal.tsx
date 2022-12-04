import React, {ReactNode, useState} from 'react';
import {Button, Checkbox} from "@mui/material";
import style from "../../../packsPage/addNewPack/AddNewPack.module.css";
import s from './DeleteCardModal.module.css'
import {DeleteCardTC} from "../../CardsReducer";
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {BasicModal} from "../../../../common/modal/BasicModal";

type DeleteCardModalType = {
    children: ReactNode
    id: string
    name: string
}

export const DeleteCardModal = ({children, id, name}: DeleteCardModalType) => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.App.status)

    const deleteCardClick = async (pack_id: string, handleClose: () => void) => {
        await dispatch(DeleteCardTC(pack_id))
        handleClose()
    }

    return (
        <BasicModal childrenBtn={children} name={'Delete Card'}>
            {(handleClose) => <>
                <div className={s.textDelete}>
                    Do you really want to remove <span style={{fontWeight: '600'}}>{name}</span>? All cards will be deleted.
                </div>
                <div className={s.blockBtn}>
                    <Button onClick={handleClose} className={style.button} variant="outlined"
                            type="submit">Cancel</Button>
                    <Button style={{color: 'white', backgroundColor: 'red',}} onClick={() => deleteCardClick(id, handleClose)}
                            className={style.button} variant="outlined" type="submit"
                            disabled={status === "loading"}>Delete</Button>
                </div>
            </>}
        </BasicModal>
    );
};
