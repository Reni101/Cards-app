import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch} from "../../../hooks/hooks";
import {editProfileNameTC} from "../profilePageReducer/ProfilePagerRedicer";

export const EditProfileName = () => {
    const [Name, setName] = useState<string>("props name" )// приходит из пропсов
    const [editMode, setEditMode] = useState(false)
    const dispatch = useAppDispatch()

    const setEditModeHandler = () => {
        setEditMode(true)
    }
    const setEditModeHandlerAndDispatchThunk = (e: ChangeEvent<HTMLInputElement>) => {
        setEditMode(false)
        dispatch(editProfileNameTC(e.currentTarget.value))
    }


    return (
        <div>
            {editMode ? <input type="text"
                               placeholder={Name}
                               onBlur={setEditModeHandlerAndDispatchThunk}
                               autoFocus/>

                : <div onDoubleClick={setEditModeHandler}>{Name}</div>}
        </div>
    );
};
