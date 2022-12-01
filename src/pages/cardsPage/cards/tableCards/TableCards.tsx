import React, {useCallback, useEffect, useState} from 'react';
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
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';

import {changePageCardsAC, changePageCardsCountAC, setCardsTC, sortCardsAC,} from '../../CardsReducer';
import {Paginator} from "../../../../common/Paginator/paginator";
import {changeSortPacksAC} from "../../../packsPage/PacksReducer";
import { DeleteCardModal } from '../cardModal/DeleteCardModal';
import {EditCardModal} from "../cardModal/EditCardModal";
type sortCardsType = 'question' | 'answer' | 'updated' | "grade"





interface CardsColumn {
    id: sortCardsType
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
    updated: string;
    grade?: number;
}

const columns: readonly CardsColumn[] = [
    {id: 'question', label: 'Question', minWidth: 170, align: 'left'},
    {id: 'answer', label: 'Answer', minWidth: 80, align: 'center'},
    {
        id: 'updated',
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
    updated: string,
    grade: number
): RowsData {
    return {id, packPackId, answer, question, updated, grade};
}


export const TableCards = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';


    const cards = useAppSelector(state => state.Cards.cards)
    const sortCards = useAppSelector(state => state.Cards.sortCards)
    const status = useAppSelector(state => state.App.status)

    const packsUserId = useAppSelector(state => state.Cards.packUserId)
    const myId = useAppSelector(state => state.ProfilePage.user_id)
    const packId = useAppSelector(state => state.Cards.cardsPack_id)
    const totalCardsCount = useAppSelector(state => state.Cards.cardsTotalCount)
    const currentPage = useAppSelector(state => state.Cards.page)
    const pageCount = useAppSelector(state => state.Cards.pageCount)
    const findQuestion = useAppSelector(state => state.Cards.cardQuestion)
    const rows = cards.map((card) => createData(card._id, card.cardsPack_id, card.answer, card.question, card.updated, card.grade))


    const [grade, setGrade] = useState<number | null>(0); // пригодится

    useEffect(() => {
        if (searchQuery !== findQuestion) return
        dispatch(setCardsTC(packId, searchQuery))
    }, [currentPage, pageCount, findQuestion, sortCards])


    const handleChangePage = useCallback((newPage: number) => {
        dispatch(changePageCardsAC(newPage))
    }, [dispatch])

    const handleChangeRowsPerPage = useCallback((rows: number) => {
        dispatch(changePageCardsCountAC(rows))
    }, [dispatch])

    // const handleUpdateCard = (idCard: string, question: string) => {
    //     const card = {
    //         _id: idCard,
    //         question
    //     }
    //     dispatch(UpdateCardTC(card))
    // }
    //
    // const handleDeleteCard = (idCard: string) => {
    //     dispatch(DeleteCardTC(idCard))
    // }


    const handleSortCards = (columnID: sortCardsType) => {
        const val = sortCards === ('0' + columnID)
        dispatch(sortCardsAC(val ? `1${columnID}` : `0${columnID}`))
    }


    const goToPacksClick = () => {
        navigate(packsRoute)
    }

    if (cards.length === 0) {
        return (
            <div className={style.empty_pack}>
                <div className={style.empty_text}>Pu pu pu... This pack does not exist, please take another pack</div>
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
                                                                      <EditCardModal question={row.question} idCard={row.id}>
                                                                          <DriveFileRenameOutlineOutlinedIcon
                                                                              color={'primary'}/>
                                                                      </EditCardModal>
                                                                    </div>
                                                                    <div className={style.icons}>
                                                                 <DeleteCardModal id={row.id} name={row.question}>
                                                                     <DeleteForeverOutlinedIcon color={'primary'}/>
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

