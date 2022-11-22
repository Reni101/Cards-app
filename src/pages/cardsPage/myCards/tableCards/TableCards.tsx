import React, {useState} from 'react';
import {Slide} from 'react-awesome-reveal';
import style from '../../../packsPage/tableForPacks/TableForPacks.module.css';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import TablePagination from '@mui/material/TablePagination';
import moment from 'moment/moment';
import {Rating, Typography} from '@mui/material';


interface CardsColumn {
    id: 'question' | 'answer' | 'last_updated' | 'grade';
    label: string;
    minWidth?: number;
    align?: 'center' | 'left' | 'right';
    format?: (value: string) => string;
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
    {id: 'grade', label: 'Grade', minWidth: 170, align: 'right'},
];

interface RowsData {
    packUserId: string;
    answer: string;
    question: string;
    last_updated: string;
    grade?: number;
}

function createData(
    packUserId: string,
    answer: string,
    question: string,
    last_updated: string,
    grade:number
): RowsData {

    return {packUserId, answer, question, last_updated,grade};
}

const rows: RowsData[] = [
    createData('123', 'Whats working JS',  'I dont now' , '2022-11-21T17:39:44.915Z',2),
    createData('321', 'React - what is it?',  'This is not my problem', '2022-11-21T17:39:44.915Z',3),
    createData('231', 'How many count have HTML',  'I dont understand you', '2022-11-21T17:39:44,.915Z',5)
];

export const TableCards = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [grade, setGrade] = useState<number | null>(0);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.packUserId}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id}
                                                                   align={column.align}>
                                                            {column.format && typeof value === 'string'
                                                                ? column.format(value)
                                                                : value}
                                                            {column.id === 'grade' &&
                                                                <Rating
                                                                name="simple-controlled"
                                                                value={row.grade}
                                                                onChange={(event, newValue) => {
                                                                setGrade(newValue);
                                                            }}
                                                                />
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
        </Slide>
    );
};

