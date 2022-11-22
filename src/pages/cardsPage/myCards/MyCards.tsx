import React from 'react';
import style from './MyCards.module.css'
import {NamePack} from './namePack/NamePack';
import {SearchCards} from './searchCards/SearchCards';
import {TableCards} from './tableCards/TableCards';



export const MyCards = () => {
    return (
        <div className={style.all_wrapper_my_cards}>
            <NamePack/>
            <SearchCards/>
            <TableCards/>
        </div>
    );
};

