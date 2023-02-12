import React, {memo} from 'react';
import TableCell from "@mui/material/TableCell";
import style from "../TableCards.module.css";
import {Rating} from "@mui/material";
import {EditCardModal} from "../../cardModal/EditCardModal";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import {DeleteCardModal} from "../../cardModal/DeleteCardModal";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import TableRow from "@mui/material/TableRow";
import {CardsColumn, RowDataTable} from "../TableCards";
import {useAppSelector} from "../../../../../redux/Store";

import {AnswerCard} from "../StrOrImg/AnswerCard";
import {QuestionCard} from "../StrOrImg/QuestionCard";

type PropsType = {
    row: RowDataTable,
    columns: CardsColumn[]

}

export const TableBodyRowsCards = memo((props: PropsType) => {
        const packsUserId = useAppSelector(state => state.Cards.packUserId)
        const myId = useAppSelector(state => state.ProfilePage.user_id)

        return (
            <TableRow hover role="checkbox" tabIndex={-1}>
                {props.columns.map((column) => {
                    const value = props.row[column.id];
                    return (
                        <TableCell key={column.id}
                                   align={column.align}>

                            {column.id === "question" &&
                                <QuestionCard str={props.row.question} img={props.row.questionImg}/>
                            }

                            {column.id === "answer" &&
                                <AnswerCard str={props.row.answer} img={props.row.answerImg}/>
                            }

                            {column.format && (typeof value === 'string') && column.format(value)}

                            {column.id === 'grade' &&
                                <div className={style.flex_icons}>
                                    <Rating
                                        name="simple-controlled"
                                        value={props.row.grade}
                                    />
                                    <div className={packsUserId === myId
                                        ? style.flex_icons
                                        : style.icon_display_none}>
                                        <div className={style.icons}>
                                            <EditCardModal question={props.row.question}
                                                           answer={props.row.answer}
                                                           idCard={props.row.id}>
                                                <DriveFileRenameOutlineOutlinedIcon color={'primary'}/>
                                            </EditCardModal>
                                        </div>
                                        <div className={style.icons}>
                                            <DeleteCardModal id={props.row.id}
                                                             name={props.row.question}>
                                                <DeleteForeverOutlinedIcon
                                                    color={'primary'}/>
                                            </DeleteCardModal>
                                        </div>
                                    </div>
                                </div>
                            }
                        </TableCell>
                    );
                })}
            </TableRow>
        );
    }
)
