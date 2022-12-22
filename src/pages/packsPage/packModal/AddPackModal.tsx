import React, {KeyboardEvent, ReactNode, useState, ChangeEvent} from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {BasicModal} from '../../../common/modal/BasicModal';
import {Button, Checkbox} from '@mui/material';
import style from '../addNewPack/AddNewPack.module.css';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {AddPackTC} from '../PacksReducer';
import s from './AddPackModal.module.css'
import {useSearchParams} from 'react-router-dom';
import {setErrorApp} from '../../../AppReducer';
import {CoverForTable} from '../tableForPacks/coverForTable/CoverForTable';
import {IconButton} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {convertFileToBase64} from '../../../common/convertFileToBase64/ConvertFileToBase64';


type AddPackModalType = {
    children: ReactNode
    cover?: string
}

export const AddPackModal = ({children, cover}: AddPackModalType) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQueryUserId = searchParams.get('user_id') || '';
    const status = useAppSelector(state => state.App.status)

    const [valueInput, setValueInput] = useState('')
    const dispatch = useAppDispatch()

    const isLoading = status === 'loading'

    const [newCover, setNewCover] = useState<string>('')

    const AddNewPack = async (handleClose: () => void) => {
        let trimValueInput = valueInput.trim();
        if (trimValueInput.toLowerCase() === 'хуй' || trimValueInput.toLowerCase() === 'fuck') {
            setValueInput('');
            dispatch(setErrorApp('foul language is prohibited'))
            return;
        }

        handleClose()
        await dispatch(AddPackTC({name: valueInput, deckCover: newCover}, searchQueryUserId))
        setNewCover('')
        setValueInput('')
    }

    const AddNewPackWithInput = async (e: KeyboardEvent<HTMLDivElement>, handleClose: () => void): Promise<void> => {
        if (e.key === 'Enter') {
            await AddNewPack(handleClose)
        }
    }


    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 100000) {
                convertFileToBase64(file, (file64: string) => {
                    setNewCover(file64)
                })
            } else {
                dispatch(setErrorApp('This file really large'))
            }
        }
    };

    return (
        <BasicModal childrenBtn={children} name={'Add new pack'}>
            {(handleClose: () => void) => <>

                <div className={s.wrapper_img}>
                    <CoverForTable cover={newCover}/>
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
                               onKeyUp={(e) => AddNewPackWithInput(e, handleClose)}
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



