import React, {useState} from 'react';
import {Slide} from 'react-awesome-reveal';
import style from './TableCards.module.css'
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import moment from 'moment/moment';
import {Button, Rating} from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {useAppSelector} from '../../../../hooks/hooks';
import {packsRoute} from '../../../../common/paths/Paths';
import {useNavigate} from 'react-router-dom';


interface CardsColumn {
    id: 'question' | 'answer' | 'last_updated' | 'grade';
    label: string;
    minWidth?: number;
    align?: 'center' | 'left' | 'right';
    format?: (value: string) => string;
}

interface RowsData {
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
    packPackId: string,
    answer: string,
    question: string,
    last_updated: string,
    grade: number
): RowsData {
    return {packPackId, answer, question, last_updated, grade};
}


export const TableCards = () => {
    const navigate = useNavigate()
    const cards = useAppSelector(state => state.Cards.cards)
    const packsUserId = useAppSelector(state => state.Cards.packUserId)
    const myId = useAppSelector(state => state.ProfilePage.user_id)

    const rows = cards.map((card) => createData(card.cardsPack_id, card.answer, card.question, card.updated, card.grade))

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [grade, setGrade] = useState<number | null>(0);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const goToPacksClick = () => {
        navigate(packsRoute)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
                                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.packPackId}>
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
                                                                    : `${style.flex_icons} ${style.icon_display_none}`}>
                                                                    <div className={style.icons}>
                                                                        <DriveFileRenameOutlineOutlinedIcon
                                                                            color={'primary'}/>
                                                                    </div>
                                                                    <div className={packsUserId === myId
                                                                        ? style.flex_icons
                                                                        : `${style.flex_icons} ${style.icon_display_none}`}>
                                                                        <DeleteForeverOutlinedIcon
                                                                            color={'primary'}/>
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
    );
};

