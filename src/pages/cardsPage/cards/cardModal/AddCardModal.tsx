import React, {ReactNode} from 'react';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import style from "../../cards/namePack/NamePack.module.css";
import s from './AddCardModal.module.css'
import {BasicModal} from "../../../../common/modal/BasicModal";
import {useFormik} from "formik";
import {addCardTC} from "../../../../redux/Cards-reducer";
import {useAppDispatch, useAppSelector} from "../../../../redux/Store";

type AddPackModalType = {
    children: ReactNode
    cardsPack_id: string
}

export const AddCardModal = ({children, cardsPack_id}: AddPackModalType) => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.App.status)

    const formik = useFormik({
        initialValues: {
            question: '',
            answer: ''
        },
        onSubmit: (values, handleClose: any) => {
            {
                cardsPack_id &&
                dispatch(addCardTC({cardsPack_id: cardsPack_id, question: values.question, answer: values.answer}))
            }
            formik.resetForm()
            handleClose()
        },

    });

    const handlerSubmitForm = (handleClose: () => void) => {
        formik.handleSubmit()
        handleClose()
    }

    return (
        <BasicModal childrenBtn={children} name={'Add new card'}>
            {(handleClose) => <form className={s.InputBlock} onSubmit={() => handlerSubmitForm(handleClose)}>
                <TextField onChange={formik.handleChange}
                           name={'question'} style={{marginBottom: '20px'}} value={formik.values.question}
                           id="standard-basic" label="Question" variant="standard"/>
                <TextField onChange={formik.handleChange}
                           name={'answer'} style={{marginBottom: '20px'}} value={formik.values.answer}
                           id="standard-basic" label="Answer" variant="standard"/>

                <div className={s.blockBtn}>
                    <Button onClick={handleClose} className={style.button} variant="outlined">Cancel</Button>
                    <Button style={{color: 'white', backgroundColor: '#366EFF',}}
                            className={style.button} variant="outlined" type="submit"
                            disabled={status === "loading"}>Save</Button>
                </div>
            </form>}
        </BasicModal>
    )
}
