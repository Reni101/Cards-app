import React from 'react';
import style from'./PacksPage.module.css'
import {AddNewPack} from './addNewPack/AddNewPack';
import {FiltersForPacks} from './filtersForPacks/FiltersForPacks';
import {TableForPacks} from './tableForPacks/TableForPacks';

export const PacksPage = () => {
    return (
        <div className={style.all_wrapper_packs}>
            <AddNewPack/>
            <FiltersForPacks/>
            <TableForPacks/>
        </div>
    );
};

