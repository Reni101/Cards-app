import React from 'react';
import style from './PacksPage.module.css'
import {AddNewPack} from './addNewPack/AddNewPack';
import {FiltersForPacks} from './filtersForPacks/FiltersForPacks';
import {TableForPacks} from './tableForPacks/TableForPacks';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/hooks';
import {loginRoute} from '../../common/paths/Paths';


export const PacksPage = () => {


    const isAuth = useAppSelector(state => state.Login.isAuth)

    if (!isAuth) {
        return <Navigate to={loginRoute}/>
    }

    return (
        <div className={style.all_wrapper_packs}>
            <AddNewPack/>
            <FiltersForPacks/>
            <TableForPacks/>
        </div>
    );
};

