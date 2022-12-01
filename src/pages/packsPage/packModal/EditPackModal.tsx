import React, {ReactNode, useState} from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {BasicModal} from "../../../common/modal/BasicModal";
import {Button, Checkbox} from "@mui/material";
import style from "../addNewPack/AddNewPack.module.css";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import s from './EditPackModal.module.css'
import {RequestUpdatePackType} from "../PacksAPI";
import {UpdatePackTC} from "../PacksReducer";

type EditPackModalType = {
    children: ReactNode
    id: string
}

export const EditPackModal = ({children, id}: EditPackModalType) => {

    const [open, setOpen] = React.useState(false);

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.App.status)
    const pack = useAppSelector(state => state.Packs.cardPacks.find(pack => pack._id === id))
    const [valueInput, setValueInput] = useState(pack?.name)
    const updatePackClick = (cards_pack: RequestUpdatePackType) => {
        dispatch(UpdatePackTC(cards_pack))
        setValueInput('')
        setOpen(false)
    }

    const HandlerCancel = () => {
        setOpen(false)
    }

    return (
        <BasicModal childrenBtn={children} open={open} setOpen={setOpen} name={'Edit pack'}>
            <div>
                <div className={s.InputBlock}>
                    <TextField style={{marginBottom: '20px'}} value={valueInput}
                               onChange={(e) => setValueInput(e.currentTarget.value)}
                               id="standard-basic" label="Name pack" variant="standard"/>
                    <FormControlLabel control={<Checkbox defaultChecked/>} label="Private pack"/>
                </div>
                <div className={s.blockBtn}>
                    <Button onClick={HandlerCancel} className={style.button} variant="outlined"
                            type="submit">Cancel</Button>
                    <Button style={{color: 'white', backgroundColor: '#366EFF'}}
                            onClick={() => updatePackClick({_id: id, name: valueInput})}
                            className={style.button} variant="outlined" type="submit"
                            disabled={status === "loading"}>Save</Button>
                </div>
            </div>
        </BasicModal>
    );
};
