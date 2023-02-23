import React from 'react';
import {ColumnUsers, RowsDataUsers} from "../tableForUsers/UsersTabelData";
import {useAppDispatch} from "../../../redux/Store";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

type PropsType = {
    row: RowsDataUsers
    columns: ColumnUsers[]
}
export const TableBodyRowsUsers = (props: PropsType) => {
    const dispatch = useAppDispatch()


    return (

            <TableRow hover role="checkbox" tabIndex={-1}>
                {props.columns.map((column) => {
                    return (
                        <TableCell key={column.id}
                                   align={column.align}
                                   onClick={() => {
                                   }}>

                        </TableCell>
                    );
                })}
            </TableRow>

    );
};


// export const TableBodyRowsPacks = (props: PropsType) => {
//
//     const navigate = useNavigate()
//
//     const user_idFromProfile = useAppSelector(state => state.ProfilePage.user_id)
//     const status = useAppSelector(state => state.App.status)
//     const isLoading = status === 'loading'
//
//     const goToCardsHandler = (card_pack_id: string) => {
//         dispatch(setPacksIdAC({packsId: card_pack_id}))
//         navigate(`/cards/${card_pack_id}`)
//     }
//
//     const goToLearnHandler = (card_pack_id: string) => {
//         dispatch(setPacksIdAC({packsId: card_pack_id}))
//         navigate(`/learn/${card_pack_id}`)
//     }
//
//     return (
//
//     );
// };
//
