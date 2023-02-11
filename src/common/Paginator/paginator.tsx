import React, {memo} from 'react';
import TablePagination from "@mui/material/TablePagination";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import {useAppSelector} from "../../redux/Store";



type TablePaginationActionsProps = {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}
type PaginatorPropsType = {
    name: string
    cardPacksTotalCount: number
    currentPage: number
    changePage: (page: number) => void
    changeRows: (rows: number) => void
}

export const Paginator = memo((props: PaginatorPropsType) => {
    const [page, setPage] = React.useState(props.currentPage - 1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        props.changePage(newPage + 1)
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        let rows = +event.target.value
        setRowsPerPage(rows);
        props.changeRows(rows)
        setPage(0);
    };
    return (
        <>
            <TablePagination
                labelRowsPerPage={props.name}
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={props.cardPacksTotalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </>
    );
})

function TablePaginationActions(props: TablePaginationActionsProps) {
    const status = useAppSelector(state => state.App.status)
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (event:React.MouseEvent<HTMLButtonElement>,) => {
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
                disabled={page === 0 || status === "loading"}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton

                onClick={handleBackButtonClick}
                disabled={page === 0 || status === "loading"}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1 || status === "loading"}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1 || status === "loading"}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </Box>
    );
}