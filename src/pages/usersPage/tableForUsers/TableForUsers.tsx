import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../redux/Store";
import {changeUsersPageAC, changeUsersPageCountAC, setUsersTC} from "../../../redux/Users-reducer";
import {ExampleAnimation} from "../../../common/lottieAnimation/LottieAnimation";
import {LottieNoSearch} from "../../../common/lottieAnimation/LottieNoSearch/LottieNoSearch";
import {columnsUsers, createDataUsers, RowsDataUsers, sortTypeUsers} from "./UsersTabelData";
import style from './TableForUsers.module.css';
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Paginator} from "../../../common/paginator/Paginator";
import {TableBodyRowsUsers} from "../tabelForBodyUsers/TableBodyRowsUsers";

export const TableForUsers = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.App.status)
    const totalUsers = useAppSelector(state => state.Users.usersTotalCount)
    const users = useAppSelector(state => state.Users.users)
    const currentPage = useAppSelector(state => state.Users.page)
    const pageCount = useAppSelector(state => state.Users.pageCount)
    const sortUsers = useAppSelector(state => state.Users.sortUsers)
    const searchName = useAppSelector(state => state.Users.searchName)
    const isLoading = status === 'loading'
    const rows: RowsDataUsers[] = users.map(user => createDataUsers(user.email, user._id, user.name
        , user.publicCardPacksCount, user.avatar))


    const sortHandler = (columnID: sortTypeUsers) => {
        const val = sortUsers === ('0' + columnID)
        // dispatch(changeSortPacksAC({sortPacks: val ? `1${columnID}` : `0${columnID}`}))
    }

    const changePageHandler = useCallback((newPage: number) => {
        dispatch(changeUsersPageAC(newPage))
    }, [dispatch])

    const changeRowsPerPageHandler = useCallback((rows: number) => {
        dispatch(changeUsersPageCountAC(rows))
    }, [dispatch])


    useEffect(() => {
        dispatch(setUsersTC())
    }, [currentPage, pageCount,searchName])


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
        <Paper sx={{width: '100%'}} className={style.wrapper}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columnsUsers.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                    className={style.table_title_cell}
                                    onClick={() => sortHandler(column.id)}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row =>
                            <TableBodyRowsUsers
                                key={row._id}
                                row={row}
                                columns={columnsUsers}
                            />)}
                    </TableBody>
                </Table>
            </TableContainer>
            <Paginator name={'Количество пользовательей'}
                       cardPacksTotalCount={totalUsers}
                       currentPage={currentPage}
                       changePage={changePageHandler}
                       changeRows={changeRowsPerPageHandler}
                       pageCount={pageCount}
            />
        </Paper>
    );
};

