import React, {useEffect, useState} from 'react';
import style from './TableCards.module.css'
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import moment from 'moment/moment';
import {Button, Rating} from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import {packsRoute} from '../../../../common/paths/Paths';
import {useNavigate} from 'react-router-dom';

import {changePageCardsAC, changePageCardsCountAC, DeleteCardTC, setCardsTC, UpdateCardTC} from '../../CardsReducer';
import {Paginator} from "../../../../common/Paginator/paginator";

interface CardsColumn {
    id: 'question' | 'answer' | 'last_updated' | 'grade';
    label: string;
    minWidth?: number;
    align?: 'center' | 'left' | 'right';
    format?: (value: string) => string;
}

interface RowsData {
    id: string;
    packPackId: string;
    answer: string;
    question: string;
    last_updated: string;
    grade?: number;
}

const columns: readonly CardsColumn[] = [
    {id: 'question', label: 'Question', minWidth: 170, align: 'left'},
    {id: 'answer', label: 'Answer', minWidth: 80, align: 'center'},
    {
        id: 'last_updated',
        label: 'Last updated',
        minWidth: 170,
        format: (value: string) => moment(value).utc().format('DD.MM.YYYY'),
        align: 'center'
    },
    {id: 'grade', label: 'Grade', minWidth: 170, align: 'left'},
];


function createData(
    id: string,
    packPackId: string,
    answer: string,
    question: string,
    last_updated: string,
    grade: number
): RowsData {
    return {id, packPackId, answer, question, last_updated, grade};
}


export const TableCards = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()


    const cards = useAppSelector(state => state.Cards.cards)
    const packsUserId = useAppSelector(state => state.Cards.packUserId)
    const myId = useAppSelector(state => state.ProfilePage.user_id)
    const packId = useAppSelector(state => state.Cards.query.cardsPack_id)
    const totalCardsCount = useAppSelector(state => state.Cards.cardsTotalCount)
    const currentPage = useAppSelector(state => state.Cards.page)
    const pageCount = useAppSelector(state => state.Cards.query.pageCount)
    const findQuestion = useAppSelector(state => state.Cards.query.cardQuestion)
    const rows = cards.map((card) => createData(card._id, card.cardsPack_id, card.answer, card.question, card.updated, card.grade))


    const [grade, setGrade] = useState<number | null>(0); // пригодится


    useEffect(() => {
        dispatch(setCardsTC(packId))
    }, [dispatch,currentPage, pageCount, findQuestion])

    const handleChangePage = (newPage: number) => {
        dispatch(changePageCardsAC(newPage))
    };

    const handleChangeRowsPerPage = (rows: number) => {
        dispatch(changePageCardsCountAC(rows))
    };

    const handleUpdateCard = (idCard: string, question: string) => {
        const card = {
            _id: idCard,
            question
        }
        dispatch(UpdateCardTC(card))
    }

    const handleDeleteCard = (idCard: string) => {
        dispatch(DeleteCardTC(idCard))
    }

    const goToPacksClick = () => {
        navigate(packsRoute)
    }


    if (cards.length === 0) {
        return (
            <div className={style.empty_pack}>
                <div className={style.empty_text}>Pu pu pu... this pack empty, please take another pack</div>
                <Button onClick={goToPacksClick} variant="outlined">go to packs list</Button>
            </div>
        )
    }
    return (
        <div className={style.table_all_wrapper}>
            <Paper sx={{width: '100%'}}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                        className={style.table_title_cell}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id}
                                                               align={column.align}
                                                    >

                                                        {column.format &&
                                                        typeof value === 'string'
                                                            ? column.format(value)
                                                            :
                                                            <div className={column.id === 'grade'
                                                                ? style.icon_display_none
                                                                : style.value_box}>
                                                                {value}
                                                            </div>
                                                        }
                                                        {column.id === 'grade' &&
                                                            <div className={style.flex_icons}>
                                                                <Rating
                                                                    name="simple-controlled"
                                                                    value={row.grade}
                                                                    onChange={(event, newValue) => {
                                                                        setGrade(newValue);
                                                                    }}
                                                                />
                                                                <div className={packsUserId === myId
                                                                    ? style.flex_icons
                                                                    : style.icon_display_none}>
                                                                    <div className={style.icons}>
                                                                        <DriveFileRenameOutlineOutlinedIcon
                                                                            color={'primary'}
                                                                            onClick={() => handleUpdateCard(row.id, 'new question')}/>
                                                                    </div>
                                                                    <div className={style.icons}>
                                                                        <DeleteForeverOutlinedIcon
                                                                            color={'primary'}
                                                                            onClick={() => handleDeleteCard(row.id)}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paginator name={"Количество карт"}
                           cardPacksTotalCount={totalCardsCount}
                           currentPage={currentPage}
                           changePage={handleChangePage}
                           changeRows={handleChangeRowsPerPage}/>
            </Paper>
        </div>
    );
};

