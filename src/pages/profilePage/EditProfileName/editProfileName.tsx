import React, {ChangeEvent, FC, useState} from 'react';
import {useAppDispatch} from "../../../hooks/hooks";
import {editProfileNameTC} from "../profilePageReducer/ProfilePagerReducer";
import styleEditProfile from './editProfileName.module.css'
import EditIcon from '@mui/icons-material/Edit';
import {Button, TextField} from "@mui/material";


type PropsType = {
    NickName: string
}
export const EditProfileName: FC<PropsType> = ({NickName}) => {
    const [Name, setName] = useState<string  >(NickName)// приходит из пропсов
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
                               style={{margin: "30px", width: "300px"}}
                               variant="standard"
                               autoFocus
                               onChange={onChangeHandler}
                               onBlur={setEditModeHandler}

                    />
                    <Button size="small" onMouseDown={Handler} variant="contained">SAVE</Button>
                </div>

                : <div className={styleEditProfile.Name}>{NickName} <EditIcon onClick={setEditModeHandler}/></div>}
        </div>
    );
};
//Когда стоит на кнопке onClick то он перерывается onBlur это фиксится елси поставить onMouseDown на кнопку!