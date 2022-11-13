import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch} from "../../../hooks/hooks";
import {editProfileNameTC} from "../profilePageReducer/ProfilePagerReducer";
import styleEditProfile from './editProfileName.module.css'
import EditIcon from '@mui/icons-material/Edit';
import {Button, TextField} from "@mui/material";

export const EditProfileName = () => {
    const [Name, setName] = useState<string>("props name")// приходит из пропсов
    const [editMode, setEditMode] = useState(false)
    const dispatch = useAppDispatch()

    const setEditModeHandler = () => {

        setEditMode(!editMode)

    }
    const Handler = () => {

        dispatch(editProfileNameTC(Name))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }


    return (
        <div>
            {editMode ? <div className={styleEditProfile.EditNickName}>
                    <TextField label="Nickname"
                               style={{margin: "30px", width: "200px"}}
                               variant="standard"
                               placeholder={Name}
                               autoFocus
                               onChange={onChangeHandler}
                               onBlur={setEditModeHandler}

                    />
                    <Button size="small" onMouseDown={Handler} variant="contained">SAVE</Button>
                </div>

                : <div className={styleEditProfile.Name}>{Name} <EditIcon onClick={setEditModeHandler}/></div>}
        </div>
    );
};
//Когда стоит на кнопке onClick то он перерывается onBlur это фиксится елси поставить onMouseDown на кнопку!