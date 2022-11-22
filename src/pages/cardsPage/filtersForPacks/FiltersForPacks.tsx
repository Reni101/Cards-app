import React from 'react';
import style from './FiltersForPacks.module.css'
import {SearchPacks} from './searchPacks/SearchPacks';
import {FilterMyOrAll} from './filterMyOrAll/FilterMyOrAll';
import {FilterRange} from './filterRange/FilterRange';
import {ResettingAllFilters} from './resettingAllFilters/ResettingAllFilters';

export const FiltersForPacks = () => {
    return (
        <div className={style.all_wrapper_for_filters_for_packs}>
            <SearchPacks/>
            <FilterMyOrAll/>
            <FilterRange/>
            <ResettingAllFilters/>
        </div>
    );
};

