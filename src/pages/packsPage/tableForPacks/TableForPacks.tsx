import React, {useCallback, useEffect} from 'react';
import style from './TableForPacks.module.css'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useSearchParams} from 'react-router-dom';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {changePageAC, changePageCountAC, changeSortPacksAC, setCardsPackTC} from '../../../redux/Packs-reducer';
import {queryModelType} from '../../../api/Packs-api';
import {Paginator} from '../../../common/paginator/Paginator';
import {LottieNoSearch} from '../../../common/lottieAnimation/LottieNoSearch/LottieNoSearch';
import {ExampleAnimation} from '../../../common/lottieAnimation/LottieAnimation';
import {useAppDispatch, useAppSelector} from "../../../redux/Store";
import {TableBodyRowsPacks} from "./tableForBodyPacks/TableBodyRowsPacks";
import {columnsPacks, createDataPacks, RowsDataPacks, sortTypePacks} from "./PacksTabelData";


export const TableForPacks = () => {
    const dispatch = useAppDispatch()

    const [searchParams] = useSearchParams();
    const searchQueryName = searchParams.get('search') || '';
    const searchQueryUserId = searchParams.get('user_id') || '';
    const searchQueryMin = searchParams.get('min') || '';
    const searchQueryMax = searchParams.get('max') || '';

    const status = useAppSelector(state => state.App.status)
    const packs_user_id = useAppSelector(state => state.Packs.user_id)
    const packName = useAppSelector(state => state.Packs.packName)
    const min = useAppSelector(state => state.Packs.min)
    const max = useAppSelector(state => state.Packs.max)
    const pageCount = useAppSelector(state => state.Packs.pageCount)
    const sortPacks = useAppSelector(state => state.Packs.sortPacks)
    const currentPage = useAppSelector(state => state.Packs.page)
    const cardPacksTotalCount = useAppSelector(state => state.Packs.cardPacksTotalCount)
    const rowsArray = useAppSelector(state => state.Packs.cardPacks)
    const maxCardsCount = useAppSelector(state => state.Packs.maxCardsCount)
    const isLoading = status === 'loading'

    const rows: RowsDataPacks[] = rowsArray.map((row) =>
        createDataPacks(row.deckCover, row._id, row.user_id, row.name, row.cardsCount, row.user_name, row.updated))

    const changePageHandler = useCallback((newPage: number) => {
        dispatch(changePageAC({page: newPage}))
    }, [dispatch])

    const changeRowsPerPageHandler = useCallback((rows: number) => {
        dispatch(changePageCountAC({pageCount: rows}))
    }, [dispatch])

    const sortHandler = (columnID: sortTypePacks) => {
        if (columnID === 'actions' || columnID === "cover") return
        const val = sortPacks === ('0' + columnID)
        dispatch(changeSortPacksAC({sortPacks: val ? `1${columnID}` : `0${columnID}`}))
    }

    useEffect(() => {
        if (searchQueryName !== packName) return
        const min_params = Number(searchQueryMin)
        const max_params = Number(searchQueryMax)

        let QuerySearchParams: queryModelType = {
            min: min_params,
            max: max_params,
            packName: searchQueryName,
            user_id: searchQueryUserId
        }

        dispatch(setCardsPackTC(QuerySearchParams))
    }, [packName, min, max, pageCount, sortPacks, currentPage, packs_user_id, searchQueryUserId])


    if (isLoading) {
        return (
            <ExampleAnimation/>
        )
    }
    if (rows.length === 0) {
        const error = 'Pu pu pu... This pack was not found';
        return (
            <LottieNoSearch error_name={error}/>
        )
    }

    return (
        <div className={style.table_all_wrapper}>
            <Paper sx={{width: '100%'}}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columnsPacks.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                        className={style.table_title_cell}
                                        onClick={() => sortHandler(column.id)}>
                                        {column.label}
                                        {sortPacks === ('0' + column.id)
                                            ?
                                            <span className={column.id === 'actions'
                                                ? style.actions_display_no
                                                : style.sort_icon}>
                                                    <ArrowDropDownIcon/>
                                                </span>
                                            :
                                            <span className={column.id === 'actions'
                                                ? style.actions_display_no
                                                : style.sort_icon}>
                                                    <ArrowDropUpIcon/>
                                                </span>
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.filter((r) =>
                                Number(searchQueryMin) <= r.cardsCount && r.cardsCount <= maxCardsCount)
                                .map(row =>
                                    <TableBodyRowsPacks row={row}
                                                        columns={columnsPacks}
                                                        key={row.pack_id}/>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paginator name={'Количество карт'}
                           cardPacksTotalCount={cardPacksTotalCount}
                           currentPage={currentPage!}
                           changePage={changePageHandler}
                           changeRows={changeRowsPerPageHandler}
                           pageCount={pageCount}
                />
            </Paper>
        </div>
    );
};
