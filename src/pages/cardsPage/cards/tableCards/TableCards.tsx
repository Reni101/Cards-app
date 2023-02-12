import React, {useCallback, useEffect} from 'react';
import style from './TableCards.module.css'
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import moment from 'moment/moment';
import {useParams, useSearchParams} from 'react-router-dom';
import {changePageCardsAC, changePageCardsCountAC, setCardsTC, sortCardsAC,} from '../../../../redux/Cards-reducer';
import {Paginator} from "../../../../common/paginator/Paginator";
import {ExampleAnimation} from '../../../../common/lottieAnimation/LottieAnimation';
import {LottieNoSearch} from '../../../../common/lottieAnimation/LottieNoSearch/LottieNoSearch';
import {useAppDispatch, useAppSelector} from '../../../../redux/Store';
import {TableBodyRowsCards} from "./tableBodyRows/TableBodyRowsCards";


type sortCardsType = 'question' | 'answer' | 'updated' | "grade"

export type CardsColumn = {
    id: sortCardsType
    label: string;
    minWidth?: number;
    align?: 'center' | 'left' | 'right';
    format?: (value: string) => string;
}

const columns: CardsColumn[] = [
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


export type RowDataTable = {
    id: string;
    packPackId: string;
    answer: string;
    question: string;
    updated: string;
    grade?: number;
    questionImg: string
    answerImg: string
}

function createData(
    id: string,
    packPackId: string,
    answer: string,
    question: string,
    updated: string,
    grade: number,
    questionImg: string,
    answerImg: string,
): RowDataTable {
    return {id, packPackId, answer, question, updated, grade, questionImg, answerImg};
}


export const TableCards = () => {
    const dispatch = useAppDispatch()
    const {packIdQuery} = useParams();
    const status = useAppSelector(state => state.App.status)
    const cards = useAppSelector(state => state.Cards.cards)
    const sortCards = useAppSelector(state => state.Cards.sortCards)
    const packId = useAppSelector(state => state.Cards.cardsPack_id)
    const totalCardsCount = useAppSelector(state => state.Cards.cardsTotalCount)
    const currentPage = useAppSelector(state => state.Cards.page)
    const pageCount = useAppSelector(state => state.Cards.pageCount)
    const findQuestion = useAppSelector(state => state.Cards.cardQuestion)

    const rows = cards.map((card) => createData(card._id, card.cardsPack_id,
        card.answer, card.question, card.updated, card.grade, card.questionImg, card.answerImg))

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const changePageHandler = useCallback((newPage: number) => {
        dispatch(changePageCardsAC({page: newPage}))
    }, [dispatch])

    const changeRowsPerPageHandler = useCallback((rows: number) => {
        dispatch(changePageCardsCountAC({pageCount: rows}))
    }, [dispatch])

    const sortCardsHandler = (columnID: sortCardsType) => {
        const val = sortCards === ('0' + columnID)
        dispatch(sortCardsAC({sortCards: val ? `1${columnID}` : `0${columnID}`}))
    }

    useEffect(() => {
        if (searchQuery !== findQuestion) return
        dispatch(setCardsTC(packId ? packId : packIdQuery!, searchQuery))
    }, [currentPage, pageCount, findQuestion, sortCards])


    if (cards.length === 0) {
        if (status === 'loading') {
            return (
                <ExampleAnimation/>
            )
        }

        if (rows.length === 0) {
            const error = 'There\'s nothing here';
            return (
                <LottieNoSearch error_name={error}/>
            )
        }
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
                                        onClick={() => {
                                            sortCardsHandler(column.id)
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row =>
                                <TableBodyRowsCards
                                    key={row.id}
                                    row={row}
                                    columns={columns}
                                />
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paginator name={"Количество карт"}
                           cardPacksTotalCount={totalCardsCount}
                           currentPage={currentPage}
                           changePage={changePageHandler}
                           changeRows={changeRowsPerPageHandler}
                           pageCount={pageCount}
                />
            </Paper>
        </div>
    );
};

