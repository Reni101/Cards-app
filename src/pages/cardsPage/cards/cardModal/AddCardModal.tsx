import React, {ReactNode} from 'react';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import style from "../../cards/namePack/NamePack.module.css";
import s from './AddCardModal.module.css'
import {BasicModal} from "../../../../common/modal/BasicModal";
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {useFormik} from "formik";
import {AddCardTC} from "../../CardsReducer";

type AddPackModalType = {
    children: ReactNode
    cardsPack_id: string
}

export const AddCardModal = ({children, cardsPack_id}: AddPackModalType) => {

    const [open, setOpen] = React.useState(false);

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.App.status)


    const formik = useFormik({
        initialValues: {
            question: '',
            answer: ''
        },
        onSubmit: values => {
            {
                cardsPack_id &&
                dispatch(AddCardTC({cardsPack_id: cardsPack_id, question: values.question, answer: values.answer}))
            }
            formik.resetForm()
            setOpen(false)

        },
    });

    return (
        <BasicModal childrenBtn={children} open={open} setOpen={setOpen} name={'Add new card'}>
            <form className={s.InputBlock} onSubmit={formik.handleSubmit}>
                <TextField onChange={formik.handleChange}
                           name={'question'} style={{marginBottom: '20px'}} value={formik.values.question}
                           id="standard-basic" label="Question" variant="standard"/>
                <TextField onChange={formik.handleChange}
                           name={'answer'} style={{marginBottom: '20px'}} value={formik.values.answer}
                           id="standard-basic" label="Answer" variant="standard"/>

                <div className={s.blockBtn}>
                    <Button className={style.button} variant="outlined">Cancel</Button>
                    <Button style={{color: 'white', backgroundColor: '#366EFF',}}
                            className={style.button} variant="outlined" type="submit"
                            disabled={status === "loading"}>Save</Button>
                </div>
            </form>
        </BasicModal>
    )
}
