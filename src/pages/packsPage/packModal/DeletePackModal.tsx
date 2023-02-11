import React, {ReactNode} from 'react';
import {BasicModal} from "../../../common/modal/BasicModal";
import {Button} from "@mui/material";
import style from "../addNewPack/AddNewPack.module.css";
import {DeletePackTC} from "../PacksReducer";
import s from './DeletePackModal.module.css'
import {useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../Redux/Store";

type DeletePackModalType = {
    children: ReactNode
    id: string
    name: string
}

export const DeletePackModal = ({children, id, name}: DeletePackModalType) => {

    const dispatch = useAppDispatch()

    const [searchParams] = useSearchParams()
    const searchQueryUserId = searchParams.get('user_id') || '';

    const status = useAppSelector(state => state.App.status)

    const deletePackClick = async (pack_id: string,handleClose: () => void) => {
        await dispatch(DeletePackTC(pack_id,searchQueryUserId))
        handleClose()
    }

    return (
        <BasicModal childrenBtn={children} name={'Delete Pack'}>
            {(handleClose) =>  <>
                <div className={s.textDelete}>
                    Do you really want to remove <span style={{fontWeight: '600'}}>{name}</span>? All cards will be deleted.
                </div>
                <div className={s.blockBtn}>
                    <Button onClick={handleClose} className={style.button} variant="outlined"
                            type="submit">Cancel</Button>
                    <Button style={{color: 'white', backgroundColor: 'red',}} onClick={() => deletePackClick(id, handleClose)}
                            className={style.button} variant="outlined" type="submit"
                            disabled={status === "loading"}>Delete</Button>
                </div>
            </>}
        </BasicModal>
    );
};
