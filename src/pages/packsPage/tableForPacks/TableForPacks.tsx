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
import {Slide} from 'react-awesome-reveal';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {setCardsPackTC} from '../PacksReducer';
import {useNavigate} from 'react-router-dom';
import {cardsRoute} from '../../../common/paths/Paths';
import {setCardsTC} from '../../cardsPage/CardsReducer';

interface Column {
    id: 'pack_name' | 'cards_count' | 'create_by' | 'last_updated' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'center' | 'left' | 'right';
    format?: (value: string) => string;
}

const columns: readonly Column[] = [
    {id: 'pack_name', label: 'Name', minWidth: 170, align: 'left'},
    {id: 'cards_count', label: 'Cards', minWidth: 80, align: 'center'},
    {id: 'create_by', label: 'Created by', minWidth: 170, align: 'center'},
    {
        id: 'last_updated',
        label: 'Last updated',
        minWidth: 170,
        format: (value: string) => moment(value).utc().format('DD.MM.YYYY'),
        align: 'center'
    },
    {id: 'actions', label: 'Actions', minWidth: 170, align: 'right'},
];

interface RowsData {
    id: string;
    pack_name: string;
    cards_count: number;
    create_by: string;
    last_updated: string;
    actions?: any;
}

function createData(
    id: string,
    pack_name: string,
    cards_count: number,
    create_by: string,
    last_updated: string,
): RowsData {
    return {id, pack_name, cards_count, create_by, last_updated};
}


export const TableForPacks = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(setCardsPackTC())
    }, [])

    const rowsArray = useAppSelector(state => state.Packs.cardPacks)
    const rows: RowsData[] = rowsArray.map((row) => createData(row._id, row.name, row.cardsCount, row.user_name, row.updated))

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const goToCardsClick = async(card_pack_id: string | null) => {
        await  dispatch(setCardsTC(card_pack_id))
        navigate(cardsRoute)
    }

    return (
        <Slide direction={'up'}>
            <div className={style.table_all_wrapper}>
                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{maxHeight: 440}}>
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
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];

                                                    return (
                                                        <TableCell key={column.id}
                                                                   align={column.align}
                                                                   className={column.id === 'pack_name' ? style.pack_name : ''}
                                                                    onClick={column.id === 'pack_name' ? ()=>{goToCardsClick(row.id)} : () => {}}>
                                                            {column.format && typeof value === 'string'
                                                                ? column.format(value)
                                                                : value}
                                                            {column.id === 'actions' &&
                                                                <div className={style.flex_icons}>
                                                                    <div className={style.icons}>
                                                                        <SchoolOutlinedIcon color={'primary'}/>
                                                                    </div>
                                                                    <div className={style.icons}>
                                                                        <DriveFileRenameOutlineOutlinedIcon
                                                                            color={'primary'}/>
                                                                    </div>
                                                                    <div className={style.icons}>
                                                                        <DeleteForeverOutlinedIcon color={'primary'}/>
                                                                    </div>
                                                                </div>}
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
                        rowsPerPageOptions={[5, 20, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </Slide>
    );
};
