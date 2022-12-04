import React, {KeyboardEvent, ReactNode, useState} from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {BasicModal} from "../../../common/modal/BasicModal";
import {Button, Checkbox} from "@mui/material";
import style from "../addNewPack/AddNewPack.module.css";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {AddPackTC} from "../PacksReducer";
import s from './AddPackModal.module.css'
import {useSearchParams} from "react-router-dom";
import {setErrorApp} from '../../../AppReducer';

type AddPackModalType = {
    children: ReactNode
}

export const AddPackModal = ({children}: AddPackModalType) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQueryUserId = searchParams.get('user_id') || '';
    const status = useAppSelector(state => state.App.status)

    const [valueInput, setValueInput] = useState('')
    const dispatch = useAppDispatch()

    const isLoading = status === "loading"



    const AddNewPack = async (handleClose: () => void) => {
        let trimValueInput = valueInput.trim();
        if (trimValueInput.toLowerCase() === 'хуй' || trimValueInput.toLowerCase() === 'fuck') {
            setValueInput('');
            dispatch(setErrorApp('foul language is prohibited'))
            return;
        }

        await dispatch(AddPackTC({name: valueInput},searchQueryUserId))
        setValueInput('')
        handleClose()
    }

    const AddNewPackWithInput = async (e:KeyboardEvent<HTMLDivElement>,handleClose: () => void):Promise<void> => {
        if (e.key === 'Enter') {
            await AddNewPack(handleClose)
        }
    }


    return (
        <BasicModal childrenBtn={children} name={'Add new pack'}>
            {(handleClose: () => void) => <>
                <div className={s.InputBlock}>
                    <TextField style={{marginBottom: '20px'}} value={valueInput}
                               onChange={(e)=>setValueInput(e.currentTarget.value)}
                               onKeyUp={(e)=>AddNewPackWithInput(e,handleClose)}
                               id="standard-basic" label="Name pack" variant="standard"/>
                    <FormControlLabel control={<Checkbox defaultChecked/>} label="Private pack"/>
                </div>
                <div className={s.blockBtn}>
                    <Button onClick={handleClose} className={style.button} variant="outlined"
                            type="submit">Cancel</Button>
                    <Button style={{color: 'white', backgroundColor: '#366EFF'}} onClick={() => AddNewPack(handleClose)}
                            className={style.button} variant="outlined" type="submit"
                            disabled={isLoading}>Save</Button>
                </div>
            </>}
        </BasicModal>
    );
};
