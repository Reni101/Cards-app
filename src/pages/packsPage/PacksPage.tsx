import React from 'react';
import style from'./PacksPage.module.css'
import {AddNewPack} from '../cardsPage/addNewPack/AddNewPack';
import {FiltersForPacks} from '../cardsPage/filtersForPacks/FiltersForPacks';
import {TableForPacks} from '../cardsPage/tableForPacks/TableForPacks';

export const PacksPage = () => {
    return (
        <div className={style.all_wrapper_packs}>
            <AddNewPack/>
            <FiltersForPacks/>
            <TableForPacks/>
        </div>
    );
};

