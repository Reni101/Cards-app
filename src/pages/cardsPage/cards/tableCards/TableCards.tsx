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
import { Rating} from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import { useParams, useSearchParams} from 'react-router-dom';
import {changePageCardsAC, changePageCardsCountAC, setCardsTC, sortCardsAC,} from '../../CardsReducer';
import {Paginator} from "../../../../common/Paginator/paginator";
import {DeleteCardModal} from '../cardModal/DeleteCardModal';
import {EditCardModal} from "../cardModal/EditCardModal";
import {ExampleAnimation} from '../../../../common/lottieAnimation/LottieAnimation';
import {LottieNoSearch} from '../../../../common/lottieAnimation/LottieNoSearch/LottieNoSearch';


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
    const dispatch = useAppDispatch()
    const {packIdQuery} = useParams();
    const status = useAppSelector(state => state.App.status)
    const cards = useAppSelector(state => state.Cards.cards)
    const sortCards = useAppSelector(state => state.Cards.sortCards)
    const packsUserId = useAppSelector(state => state.Cards.packUserId)
    const myId = useAppSelector(state => state.ProfilePage.user_id)
    const packId = useAppSelector(state => state.Cards.cardsPack_id)
    const totalCardsCount = useAppSelector(state => state.Cards.cardsTotalCount)
    const currentPage = useAppSelector(state => state.Cards.page)
    const pageCount = useAppSelector(state => state.Cards.pageCount)
    const findQuestion = useAppSelector(state => state.Cards.cardQuestion)
    const rows = cards.map((card) => createData(card._id, card.cardsPack_id, card.answer, card.question, card.updated, card.grade))

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        if (searchQuery !== findQuestion) return
        dispatch(setCardsTC(packId ? packId : packIdQuery!, searchQuery))
    }, [currentPage, pageCount, findQuestion, sortCards])


    const changePageHandler = useCallback((newPage: number) => {
        dispatch(changePageCardsAC(newPage))
    }, [dispatch])

    const changeRowsPerPageHandler = useCallback((rows: number) => {
        dispatch(changePageCardsCountAC(rows))
    }, [dispatch])

    const sortCardsHandler = (columnID: sortCardsType) => {
        const val = sortCards === ('0' + columnID)
        dispatch(sortCardsAC(val ? `1${columnID}` : `0${columnID}`))
    }

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
                            {rows
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id}
                                                               align={column.align}>
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
                                                                />
                                                                <div className={packsUserId === myId
                                                                    ? style.flex_icons
                                                                    : style.icon_display_none}>
                                                                    <div className={style.icons}>
                                                                        <EditCardModal question={row.question}
                                                                                       answer={row.answer}
                                                                                       idCard={row.id}>
                                                                            <DriveFileRenameOutlineOutlinedIcon
                                                                                color={'primary'}/>
                                                                        </EditCardModal>
                                                                    </div>
                                                                    <div className={style.icons}>
                                                                        <DeleteCardModal id={row.id}
                                                                                         name={row.question}>
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
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paginator name={"Количество карт"}
                           cardPacksTotalCount={totalCardsCount}
                           currentPage={currentPage}
                           changePage={changePageHandler}
                           changeRows={changeRowsPerPageHandler}/>
            </Paper>
        </div>
    );
};

