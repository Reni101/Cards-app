import React from 'react';
import style from './UsersPage.module.css'
import {useAppSelector} from "../../redux/Store";
import {Navigate, useNavigate} from "react-router-dom";
import {Paths} from "../../common/paths/Paths";
import {TableForUsers} from "./tableForUsers/TableForUsers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {SearchUsers} from "./searchUsers/SearchUsers";
import {FilterUsers} from "./filterUsers/FilterUsers";

export const UsersPage = () => {
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.Login.isAuth)

    const goToPacks = () => {
        navigate(Paths.packsRoute)
    }

    if (!isAuth) {
        return <Navigate to={Paths.loginRoute}/>
    }

    return (
        <div className={style.all_wrapper_users}>
            <div className={style.go_to_pack_list} onClick={goToPacks}>
                <ArrowBackIcon style={{height: '15px'}}/>
                Back to Packs List
            </div>

            <SearchUsers/>
            <FilterUsers/>
            <TableForUsers/>
        </div>
    );
};

