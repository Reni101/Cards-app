import React, {useState} from 'react';

export const EditProfileName = () => {
    const [editMode, setEditMode] = useState(false)

    const setEditModeHandler = () => {
        setEditMode(true)
    }
    const setEditModeHandlerAndDispatchThunk = () => {
        setEditMode(false)
        //dispatch Thunk put запрос
    }


    return (
        <div>
            {editMode ? <input type="text"
                               placeholder={"Profile Name"}
                               onBlur={setEditModeHandler}
                               autoFocus/>

                : <div onDoubleClick={setEditModeHandler}>Profile Name</div>}
        </div>
    );
};
