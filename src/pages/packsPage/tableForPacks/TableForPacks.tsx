import React, {useEffect} from 'react';
import style from './TableForPacks.module.css'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import moment from 'moment';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {cardsRoute} from '../../../common/paths/Paths';

import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

import {setPacksIdAC} from '../../cardsPage/CardsReducer';
import {changePageAC, changePageCountAC, changeSortPacksAC, SetCardsPackTC} from "../PacksReducer";
import {DeletePackTC, UpdatePackTC} from '../PacksReducer';
import {RequestUpdatePackType} from '../PacksAPI';
import {Paginator} from "../../../common/Paginator/paginator";


type sortType = 'name' | 'cardsCount' | 'created' | 'updated' | 'actions'

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
    {id: 'created', label: 'Created by', minWidth: 170, align: 'center'},
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
    created: string;
    updated: string;
    actions?: any;
}

function createData(
    pack_id: string,
    user_id: string,
    name: string,
    cardsCount: number,
    created: string,
    updated: string,
): RowsData {
    return {pack_id, user_id, name, cardsCount, created, updated};
}


export const TableForPacks = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.App.status)
    //disabled={status === "loading"}

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const packName = useAppSelector(state => state.Packs.packName)
    const user_id = useAppSelector(state => state.Packs.user_id)
    const min = useAppSelector(state => state.Packs.min)
    const max = useAppSelector(state => state.Packs.max)
    const pageCount = useAppSelector(state => state.Packs.pageCount)
    const sortPacks = useAppSelector(state => state.Packs.sortPacks)
    const currentPage = useAppSelector(state => state.Packs.page)
    const cardPacksTotalCount = useAppSelector(state => state.Packs.cardPacksTotalCount)
    const user_idFromProfile = useAppSelector(state => state.ProfilePage.user_id)
    const rowsArray = useAppSelector(state => state.Packs.cardPacks)
    const rows: RowsData[] = rowsArray.map((row) =>
        createData(row._id, row.user_id, row.name, row.cardsCount, row.user_name, row.updated))

    const [page, setPage] = React.useState(currentPage! - 1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    useEffect(() => {
        if (searchQuery !== packName) return
        dispatch(SetCardsPackTC(packName))
    }, [packName, user_id, min, max, pageCount, sortPacks, currentPage])


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        dispatch(changePageAC(newPage + 1))
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);

        dispatch(changePageCountAC(+event.target.value))
    };

    const goToCardsClick = (card_pack_id: string) => {
        dispatch(setPacksIdAC(card_pack_id))
        navigate(cardsRoute)
    }
    const deletePackClick = (pack_id: string) => {
        dispatch(DeletePackTC(pack_id))
    }
    const updatePackClick = (cards_pack: RequestUpdatePackType) => {
        dispatch(UpdatePackTC(cards_pack))
    }

    const handleSort = (columnID: sortType) => {
        const val = sortPacks === ('0' + 'name')
        dispatch(changeSortPacksAC(val ? `1${columnID}` : `0${columnID}`))
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
                                        onClick={() => handleSort(column.id)}
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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.pack_id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];

                                                return (
                                                    <TableCell key={column.id}
                                                               align={column.align}
                                                               className={column.id === 'name' ? style.pack_name : ''}
                                                               onClick={column.id === 'name' ? () => {
                                                                   goToCardsClick(row.pack_id)
                                                               } : () => {
                                                               }}>
                                                        {column.format && typeof value === 'string'
                                                            ? column.format(value)
                                                            : value}
                                                        {column.id === 'actions' &&
                                                            <div className={style.flex_icons}>
                                                                <div className={style.icons}>
                                                                    <SchoolOutlinedIcon color={'primary'}/>
                                                                </div>
                                                                <div className={user_idFromProfile === row.user_id
                                                                    ? style.icons
                                                                    : `${style.icons} ${style.no_visible_icons}`}>
                                                                    <DriveFileRenameOutlineOutlinedIcon
                                                                        // disabled={status === "loading"}
                                                                        color={'primary'}
                                                                        onClick={() => updatePackClick({
                                                                            _id: row.pack_id,
                                                                            name: 'Update name'
                                                                        })}/>
                                                                </div>
                                                                <div className={user_idFromProfile === row.user_id
                                                                    ? style.icons
                                                                    : `${style.icons} ${style.no_visible_icons}`}>
                                                                    <DeleteForeverOutlinedIcon
                                                                        color={'primary'}
                                                                        onClick={() => deletePackClick(row.pack_id)}
                                                                    />
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
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={cardPacksTotalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </Paper>
        </div>
    );
};
type TablePaginationActionsProps = {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>,) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </Box>
    );
}