import React, {ChangeEvent, KeyboardEvent, ReactNode, useState} from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {BasicModal} from "../../../common/modal/BasicModal";
import {Button, Checkbox, IconButton} from '@mui/material';
import style from "../addNewPack/AddNewPack.module.css";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import s from './EditPackModal.module.css'
import {RequestUpdatePackType} from "../PacksAPI";
import {UpdatePackTC} from "../PacksReducer";
import {useSearchParams} from "react-router-dom";
import {setErrorApp} from '../../../AppReducer';
import {convertFileToBase64} from '../../../common/convertFileToBase64/ConvertFileToBase64';
import {CoverForTable} from '../tableForPacks/coverForTable/CoverForTable';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type EditPackModalType = {
    children: ReactNode
    id: string
}

export const EditPackModal = ({children, id}: EditPackModalType) => {

    const [newCover,setNewCover] = useState<string>('')
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQueryUserId = searchParams.get('user_id') || '';

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.App.status)
    const pack = useAppSelector(state => state.Packs.cardPacks.find(pack => pack._id === id))
    const [valueInput, setValueInput] = useState(pack?.name)


    const updatePackClick = async (cards_pack: RequestUpdatePackType, handleClose: () => void) => {
        let trimValueInput = valueInput && valueInput.trim();
        if (trimValueInput && trimValueInput.toLowerCase() === 'хуй' ||
            trimValueInput && trimValueInput.toLowerCase() === 'fuck') {
            setValueInput('');
            dispatch(setErrorApp('foul language is prohibited'))
            return;
        }
        await dispatch(UpdatePackTC(cards_pack, searchQueryUserId))
        setValueInput('')
        handleClose()
    }

    const AddNewPackWithInput = async (e: KeyboardEvent<HTMLDivElement>, cards_pack: RequestUpdatePackType,handleClose: () => void): Promise<void> => {
        if (e.key === 'Enter') {
            await updatePackClick(cards_pack,handleClose)
        }
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 100000) {
                convertFileToBase64(file,(file64: string) => {
                    setNewCover(file64)
                })
            } else {
                dispatch(setErrorApp('This file really large'))
            }
        }
    };

    return (
        <BasicModal childrenBtn={children} name={'Edit pack'}>
            {(handleClose) => <>

            <div>
                <div className={s.wrapper_img}>
                    <CoverForTable cover={newCover.length === 0 ?  pack && pack.deckCover : newCover }/>
                    <label className={s.change_cover}>
                        <input type="file"
                               accept={"image/*"}
                               onChange={uploadHandler}
                               style={{display: 'none'}}
                        />
                        <IconButton component="span">
                            <CloudUploadIcon/>
                        </IconButton>
                    </label>
                </div>
                <div className={s.InputBlock}>
                    <TextField style={{marginBottom: '20px'}} value={valueInput}
                               onChange={(e) => setValueInput(e.currentTarget.value)}
                               onKeyUp={(e) => AddNewPackWithInput(e, {_id: id, name: valueInput},handleClose)}
                               id="standard-basic" label="Name pack" variant="standard"/>
                    <FormControlLabel control={<Checkbox defaultChecked/>} label="Private pack"/>
                </div>
                <div className={s.blockBtn}>
                    <Button onClick={handleClose} className={style.button} variant="outlined"
                            type="submit">Cancel</Button>
                    <Button style={{color: 'white', backgroundColor: '#366EFF'}}
                            onClick={() => updatePackClick({_id: id, name: valueInput,deckCover:newCover},handleClose)}
                            className={style.button} variant="outlined" type="submit"
                            disabled={status === "loading"}>Save</Button>
                </div>
            </>}
        </BasicModal>
    );
};
