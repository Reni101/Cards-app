import React from 'react';
import style from './PacksPage.module.css'
import {AddNewPack} from './addNewPack/AddNewPack';
import {FiltersForPacks} from './filtersForPacks/FiltersForPacks';
import {TableForPacks} from './tableForPacks/TableForPacks';
import {Navigate} from 'react-router-dom';

import {Paths} from '../../common/paths/Paths';
import {useAppSelector} from "../../Redux/Store";


export const PacksPage = () => {

    const isAuth = useAppSelector(state => state.Login.isAuth)

    if (!isAuth) {
        return <Navigate to={Paths.loginRoute}/>
    }

    return (
        <div className={style.all_wrapper_packs}>
            <AddNewPack/>
            <FiltersForPacks/>
            <TableForPacks/>
        </div>
    );
};

