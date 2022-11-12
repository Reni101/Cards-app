import React from 'react';
import SuperInputText from "../../common/SuperInputText/SuperInputText";
import SuperButton from "../../common/SuperButton/SuperButton";
import SuperCheckbox from "../../common/SuperCheckBox/SuperCheckbox";

export const TestPage = () => {
    return (
        <div>
            <SuperInputText/>
            <SuperButton red={false}/>
            <SuperCheckbox/>
        </div>
    );
};

