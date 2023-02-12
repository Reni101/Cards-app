import React, {ReactNode, useState} from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Button, Checkbox} from "@mui/material";
import style from "../../../packsPage/addNewPack/AddNewPack.module.css";
import s from './EditCardModal.module.css'
import {BasicModal} from "../../../../common/modal/BasicModal";
import {updateCardTC} from "../../../../redux/Cards-reducer";
import {RequestUpdateCardType} from "../../../../api/Cards-api";
import {useAppDispatch, useAppSelector} from "../../../../redux/Store";

type EditPackModalType = {
    children: ReactNode
    idCard: string
    question: string
    answer: string
}

export const EditCardModal = ({children, idCard, question, answer}: EditPackModalType) => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.App.status)
    const [newQuestion, setNewQuestion] = useState(question)
    const [newAnswer, setNewAnswer] = useState(answer)

    const updateCardClick = (card: RequestUpdateCardType, handleClose: () => void) => {
        dispatch(updateCardTC(card))
        setNewQuestion('')
        handleClose()
    }


    return (
        <BasicModal childrenBtn={children} name={'Edit pack'}>
            {(handleClose) => <>
                <div className={s.InputBlock}>
                    <TextField style={{marginBottom: '20px'}} value={newQuestion}
                               onChange={(e) => setNewQuestion(e.currentTarget.value)}
                               id="standard-basic" label="Question" variant="standard"/>
                    <TextField style={{marginBottom: '20px'}} value={newAnswer}
                               onChange={(e) => setNewAnswer(e.currentTarget.value)}
                               id="standard-basic" label="Answer" variant="standard"/>
                    <FormControlLabel control={<Checkbox defaultChecked/>} label="Private pack"/>
                </div>
                <div className={s.blockBtn}>
                    <Button onClick={handleClose} className={style.button} variant="outlined"
                            type="submit">Cancel</Button>
                    <Button style={{color: 'white', backgroundColor: '#366EFF'}}
                            onClick={() => updateCardClick({_id: idCard, question: newQuestion, answer: newAnswer}, handleClose)}
                            className={style.button} variant="outlined" type="submit"
                            disabled={status === "loading"}>Save</Button>
                </div>
            </>}
        </BasicModal>
    );
};
