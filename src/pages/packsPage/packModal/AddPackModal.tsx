import React, {ReactNode, useState} from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {BasicModal} from "../../../common/modal/BasicModal";
import {Button, Checkbox} from "@mui/material";
import style from "../addNewPack/AddNewPack.module.css";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {AddPackTC} from "../PacksReducer";
import s from './AddPackModal.module.css'
import {useSearchParams} from "react-router-dom";

type AddPackModalType = {
    children: ReactNode
}

export const AddPackModal = ({children}: AddPackModalType) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQueryUserId = searchParams.get('user_id') || '';
    const status = useAppSelector(state => state.App.status)


    const [open, setOpen] = React.useState(false);

    const [valueInput, setValueInput] = useState('')
    const dispatch = useAppDispatch()

    const isLoading = status === "loading"


    const AddNewPack = async () => {
        await dispatch(AddPackTC({name: valueInput},searchQueryUserId))
        setValueInput('')
        setOpen(false)
    }

    //const AddNewPack = async () => {
    //             await dispatch(AddPackTC({name:"Sanya Luchshaya TC"},searchQueryUserId))
    //     }

    const HandlerCancel = () => {
        setOpen(false)
        setValueInput('')
    }

    return (
        <BasicModal childrenBtn={children} open={open} setOpen={setOpen} name={'Add new pack'}>
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
                    <Button style={{color: 'white', backgroundColor: '#366EFF',}} onClick={AddNewPack}
                            className={style.button} variant="outlined" type="submit"
                            disabled={status === "loading"}>Save</Button>
                </div>
            </div>
        </BasicModal>
    );
};
