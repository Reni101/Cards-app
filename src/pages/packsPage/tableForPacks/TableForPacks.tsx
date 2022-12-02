import React, {useEffect,useCallback} from 'react';
import style from './TableForPacks.module.css'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import moment from 'moment';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {useNavigate, useSearchParams} from 'react-router-dom';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {changePageAC, changePageCountAC, changeSortPacksAC, SetCardsPackTC} from "../PacksReducer";
import { setPacksIdAC} from '../../cardsPage/CardsReducer';
import IconButton from '@mui/material/IconButton';
import {queryModelType} from '../PacksAPI';
import {EditPackModal} from "../packModal/EditPackModal";
import {DeletePackModal} from "../packModal/DeletePackModal";
import {Paginator} from "../../../common/Paginator/paginator";
import {LottieNoSearch} from '../../../common/lottieAnimation/LottieNoSearch/LottieNoSearch';
import {ExampleAnimation} from '../../../common/lottieAnimation/LottieAnimation';


type sortType = 'name' | 'cardsCount' | 'user_name' | 'updated' | 'actions'

interface Column {
    id: sortType;
    label: string;
    minWidth?: number;
    align?: 'center' | 'left' | 'right';
    format?: (value: string) => string;
}

const columns: readonly Column[] = [
    {id: 'name', label: 'Name', minWidth: 170, align: 'left'},
    {id: 'cardsCount', label: 'Cards', minWidth: 80, align: 'center'},
    {id: 'user_name', label: 'Created by', minWidth: 170, align: 'center'},
    {
        id: 'updated',
        label: 'Last updated',
        minWidth: 170,
        format: (value: string) => moment(value).utc().format('DD.MM.YYYY'),
        align: 'center'
    },
    {id: 'actions', label: 'Actions', minWidth: 170, align: 'right'},
];

interface RowsData {
    pack_id: string;
    user_id: string;
    name: string;
    cardsCount: number;
    user_name: string;
    updated: string;
    actions?: any;
}

function createData(
    pack_id: string,
    user_id: string,
    name: string,
    cardsCount: number,
    user_name: string,
    updated: string,
): RowsData {
    return {pack_id, user_id, name, cardsCount, user_name, updated};
}


export const TableForPacks = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.App.status)

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQueryName = searchParams.get('search') || '';
    const searchQueryUserId = searchParams.get('user_id') || '';
    const searchQueryMin = searchParams.get('min') || '';
    const searchQueryMax = searchParams.get('max') || '';


    const packs_user_id = useAppSelector(state => state.Packs.user_id)
    const packName = useAppSelector(state => state.Packs.packName)
    const min = useAppSelector(state => state.Packs.min)
    const max = useAppSelector(state => state.Packs.max)
    const pageCount = useAppSelector(state => state.Packs.pageCount)
    const sortPacks = useAppSelector(state => state.Packs.sortPacks)
    const currentPage = useAppSelector(state => state.Packs.page)
    const cardPacksTotalCount = useAppSelector(state => state.Packs.cardPacksTotalCount)
    const user_idFromProfile = useAppSelector(state => state.ProfilePage.user_id)
    const rowsArray = useAppSelector(state => state.Packs.cardPacks)
    const maxCardsCount = useAppSelector(state => state.Packs.maxCardsCount)
    const rows: RowsData[] = rowsArray.map((row) =>
        createData(row._id, row.user_id, row.name, row.cardsCount, row.user_name, row.updated))

    const isLoading = status === "loading"


    useEffect(() => {
        if(searchQueryName !== packName) return
        const min_params =  Number(searchQueryMin)
        const max_params = Number(searchQueryMax)

        let QuerySearchParams:queryModelType = {
            min:min_params,
            max:max_params,
            packName:searchQueryName,
            user_id:searchQueryUserId
        }
        dispatch(SetCardsPackTC(QuerySearchParams))
    }, [packName, min, max, pageCount, sortPacks, currentPage,packs_user_id,searchQueryUserId])


    const changePageHandler = useCallback((newPage: number) => {
        dispatch(changePageAC(newPage))
    }, [dispatch])

    const changeRowsPerPageHandler = useCallback((rows: number) => {
        dispatch(changePageCountAC(rows))
    }, [dispatch])

    const goToCardsHandler = (card_pack_id: string) => {
        dispatch(setPacksIdAC(card_pack_id))
        navigate(`/cards/${card_pack_id}`)
    }

    const goToLearnHandler = (card_pack_id: string) => {
        dispatch(setPacksIdAC(card_pack_id))
        navigate(`/learn/${card_pack_id}`)
    }

    const sortHandler = (columnID: sortType) => {
        if(columnID === 'actions') return
        const val = sortPacks === ('0' + columnID)
        dispatch(changeSortPacksAC(val ? `1${columnID}` : `0${columnID}`))
    }


    if(status === 'loading'){
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
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                        className={style.table_title_cell}
                                        onClick={() => sortHandler(column.id)}
                                    >
                                            {column.label}
                                        {
                                            sortPacks === ('0' + column.id)
                                                ?
                                                <span className={column.id === 'actions'
                                                    ? style.actions_display_no
                                                    : style.sort_icon }>
                                                    <ArrowDropDownIcon/>
                                                </span>
                                                :
                                                <span className={column.id === 'actions'
                                                    ? style.actions_display_no
                                                    : style.sort_icon }>
                                                    <ArrowDropUpIcon/>
                                                </span>
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .filter( (r) =>
                                    Number(searchQueryMin) <= r.cardsCount && r.cardsCount <= maxCardsCount)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.pack_id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];

                                                return (
                                                    <TableCell key={column.id}
                                                               align={column.align}
                                                               className={column.id === 'name' ? style.pack_name : ''}
                                                               onClick={column.id === 'name' ? () => {
                                                                   goToCardsHandler(row.pack_id)
                                                               } : () => {
                                                               }}>
                                                        {column.format && typeof value === 'string'
                                                            ? column.format(value)
                                                            : value}
                                                        {column.id === 'actions' &&
                                                            <div className={style.flex_icons}>


                                                                <div className={style.icons}>
                                                                    <IconButton
                                                                        disabled={isLoading || row.cardsCount === 0}
                                                                        onClick={() => goToLearnHandler(row.pack_id)}
                                                                        size="small">
                                                                        <SchoolOutlinedIcon
                                                                            color={isLoading || row.cardsCount === 0 ? "disabled" : "primary"}

                                                                        />
                                                                    </IconButton>

                                                                </div>


                                                                <div className={user_idFromProfile === row.user_id
                                                                    ? style.icons
                                                                    : `${style.icons} ${style.no_visible_icons}`}>
                                                                    <EditPackModal id={row.pack_id}>
                                                                        <IconButton disabled={isLoading}
                                                                                    size="small">
                                                                        <DriveFileRenameOutlineOutlinedIcon
                                                                            color={isLoading ? "disabled" : "primary"}/>
                                                                        </IconButton>
                                                                    </EditPackModal>
                                                                </div>


                                                                <div className={user_idFromProfile === row.user_id
                                                                    ? style.icons
                                                                    : `${style.icons} ${style.no_visible_icons}`}>



                                                                    <DeletePackModal id={row.pack_id} name={row.name}>
                                                                        <IconButton disabled={isLoading}
                                                                                    size="small" >
                                                                        <DeleteForeverOutlinedIcon
                                                                            color={isLoading ? "disabled" : "primary"}
                                                                        />
                                                                        </IconButton>
                                                                    </DeletePackModal>


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
                           cardPacksTotalCount={cardPacksTotalCount}
                           currentPage={currentPage!}
                           changePage={changePageHandler}
                           changeRows={changeRowsPerPageHandler}
                />
            </Paper>
        </div>
    );
};
