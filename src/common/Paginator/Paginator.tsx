import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

type PropsType = {
    currentPage: number // текущщая страница с сервака
    //  packsCount: number // количество колод на транице 5 / 10
    cardPacksTotalCount: number // сумарное количество коллод с сревака
    name: string
    onChangePage: (page: number) => void
    onChangeRows: (rows: number) => void


}


export const Paginator = (props: PropsType) => {
    // const dispatch =useAppDispatch()
    const [page, setPage] = React.useState(props.currentPage - 1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    //   let pagesCount = Math.ceil(props.cardPacksTotalCount / props.packsCount)
// количество страниц при макс колод, MU  сам расчитывает

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        // изменяет страницу сетает номер новой страницу
        props.onChangePage(newPage + 1)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        //меняет число сколько колод на странице
        //dispatch(setPacksCountTC(event.target.value)) меняет отображение колличества колод/карт на странице
        props.onChangeRows(parseInt(event.target.value, 10))
        setRowsPerPage(parseInt(event.target.value, 10));
        //после смены сетает первую страницу
        // props.onChangePage(1)
        setPage(0);
    };

    return (<>
            <TablePagination
                labelRowsPerPage={props.name}
                rowsPerPageOptions={[5, 10]}
                count={props.cardPacksTotalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}

            />
        </>


    );
}
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

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {

        //перекидывает на самую первую страницу

        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // перекидывает на предыдущую страницу
        // dispatch(changePageTC(page -1))
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // перекидывает на след страницу
        // dispatch(changePageTC(page +1))
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // перекидывает на последнюю страницу
        // dispatch(changePageTC(Math.ceil(count / rowsPerPage) - 1)))
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