import React from 'react';
import style from './UsersPage.module.css'
import {useAppSelector} from "../../redux/Store";
import {Navigate} from "react-router-dom";
import {Paths} from "../../common/paths/Paths";
import {TableForUsers} from "./tableForUsers/TableForUsers";

export const UsersPage = () => {

    const isAuth = useAppSelector(state => state.Login.isAuth)

    if (!isAuth) {
        return <Navigate to={Paths.loginRoute}/>
    }

    return (
        <div className={style.all_wrapper_users}>
            <TableForUsers/>
        </div>
    );
};

