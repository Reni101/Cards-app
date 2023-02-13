import React from 'react';
import TableCell from "@mui/material/TableCell";
import style from "../TableForPacks.module.css";
import {CoverForTable} from "../coverForTable/CoverForTable";
import IconButton from "@mui/material/IconButton";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import {EditPackModal} from "../../packModal/EditPackModal";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import {DeletePackModal} from "../../packModal/DeletePackModal";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import TableRow from "@mui/material/TableRow";
import {ColumnPacks, RowsDataPacks} from "../TableForPacks";
import {useAppDispatch, useAppSelector} from "../../../../redux/Store";
import {setPacksIdAC} from "../../../../redux/Cards-reducer";
import {useNavigate} from "react-router-dom";


type PropsType = {
    row:RowsDataPacks
    columns:ColumnPacks[]
}
export const TableBodyRowsPacks = (props:PropsType) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const user_idFromProfile = useAppSelector(state => state.ProfilePage.user_id)
    const status = useAppSelector(state => state.App.status)
    const isLoading = status === 'loading'

    const goToCardsHandler = (card_pack_id: string) => {
        dispatch(setPacksIdAC({packsId: card_pack_id}))
        navigate(`/cards/${card_pack_id}`)
    }
 
    const goToLearnHandler = (card_pack_id: string) => {
        dispatch(setPacksIdAC({packsId: card_pack_id}))
        navigate(`/learn/${card_pack_id}`)
    }

    return (
        <TableRow hover role="checkbox" tabIndex={-1}>
            {props.columns.map((column) => {
                const value = props.row[column.id];
                return (
                    <TableCell key={column.id}
                               align={column.align}
                               className={column.id === 'name' ? style.pack_name : ''}
                               onClick={column.id === 'name' || column.id === 'cover' ? () => {
                                   goToCardsHandler(props.row.pack_id)
                               } : () => {
                               }}>
                        {column.format && typeof value === 'string'
                            ? column.format(value)
                            :
                            <div
                                className={column.id !== 'cover'
                                    ? style.slot_for_value
                                    : style.display_no}>
                                {value}
                            </div>}

                        {column.id === 'cover' &&
                            <div className={style.img_wrapper}>
                                <CoverForTable cover={props.row.cover}/>
                            </div>}

                        {column.id === 'actions' &&
                            <div className={style.flex_icons}>
                                <div className={style.icons}>
                                    <IconButton
                                        disabled={isLoading || props.row.cardsCount === 0}
                                        onClick={() => goToLearnHandler(props.row.pack_id)}
                                        size="small">
                                        <SchoolOutlinedIcon
                                            color={isLoading || props.row.cardsCount === 0 ? 'disabled' : 'primary'}
                                        />
                                    </IconButton>
                                </div>


                                <div className={user_idFromProfile === props.row.user_id
                                    ? style.icons
                                    : `${style.icons} ${style.display_no}`}>
                                    <EditPackModal id={props.row.pack_id}>
                                        <IconButton disabled={isLoading}
                                                    size="small">
                                            <DriveFileRenameOutlineOutlinedIcon
                                                color={isLoading ? 'disabled' : 'primary'}/>
                                        </IconButton>
                                    </EditPackModal>
                                </div>


                                <div className={user_idFromProfile === props.row.user_id
                                    ? style.icons
                                    : `${style.icons} ${style.display_no}`}>

                                    <DeletePackModal id={props.row.pack_id} name={props.row.name}>
                                        <IconButton disabled={isLoading}
                                                    size="small">
                                            <DeleteForeverOutlinedIcon
                                                color={isLoading ? 'disabled' : 'primary'}
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
};

