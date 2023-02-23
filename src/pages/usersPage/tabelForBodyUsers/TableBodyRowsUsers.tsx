import React from 'react';
import style from "./TableBodyRowsUsers.module.css";
import {ColumnUsers, RowsDataUsers} from "../tableForUsers/UsersTabelData";
import {useAppDispatch} from "../../../redux/Store";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import defaultAvatar from "../../../assets/default-avatar.png";

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
                               align={column.align}>


                        {column.id === "avatar" &&
                            <img className={style.avatar}
                                 src={props.row.avatar ? props.row.avatar : defaultAvatar}
                                 alt="avatar"
                            />}
                        {column.id === "name" && props.row.name}
                        {column.id === "email" && props.row.email}
                        {column.id === "publicCardPacksCount" && props.row.publicCardPacksCount}
                    </TableCell>
                );
            })}
        </TableRow>

    );
}
    ;


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
