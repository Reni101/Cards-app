import React, {ReactNode, useState} from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Button, Checkbox} from "@mui/material";
import style from "../../../packsPage/addNewPack/AddNewPack.module.css";
import s from './EditCardModal.module.css'
import {BasicModal} from "../../../../common/modal/BasicModal";
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {UpdateCardTC} from "../../CardsReducer";
import {RequestUpdateCardType} from "../../CardsAPI";

type EditPackModalType = {
    children: ReactNode
    idCard: string
    question: string
}

export const EditCardModal = ({children, idCard, question}: EditPackModalType) => {

    const [open, setOpen] = React.useState(false);

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.App.status)
    const [newQuestion, setNewQuestion] = useState(question)

    const handleUpdateCard = (idCard: string, question: string) => {
        const card = {
            _id: idCard,
            question
        }
        dispatch(UpdateCardTC(card))
    }


    const updateCardClick = (card: RequestUpdateCardType) => {
        dispatch(UpdateCardTC(card))
        setNewQuestion('')
        setOpen(false)
    }

    const HandlerCancel = () => {
        setOpen(false)
    }

    return (
        <BasicModal childrenBtn={children} open={open} setOpen={setOpen} name={'Edit pack'}>
            <div>
                <div className={s.InputBlock}>
                    <TextField style={{marginBottom: '20px'}} value={newQuestion}
                               onChange={(e) => setNewQuestion(e.currentTarget.value)}
                               id="standard-basic" label="Name pack" variant="standard"/>
                    <FormControlLabel control={<Checkbox defaultChecked/>} label="Private pack"/>
                </div>
                <div className={s.blockBtn}>
                    <Button onClick={HandlerCancel} className={style.button} variant="outlined"
                            type="submit">Cancel</Button>
                    <Button style={{color: 'white', backgroundColor: '#366EFF'}}
                            onClick={() => updateCardClick({_id: idCard, question: newQuestion})}
                            className={style.button} variant="outlined" type="submit"
                            disabled={status === "loading"}>Save</Button>
                </div>
            </div>
        </BasicModal>
    );
};
