import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './SearchPacks.module.css'
import SearchIcon from '@mui/icons-material/Search';
import {Toolbar} from '@mui/material';
import {Search, SearchIconWrapper, StyledInputBase} from '../../../../common/commonStyles/stylesForSearch'
import useDebounce, {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import {changeSortPacksAC, sortPacksNameAC} from '../../PacksReducer';
import {useSearchParams} from 'react-router-dom';


export const SearchPacks = () => {
    const dispatch = useAppDispatch()


    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const debouncedValue = useDebounce<string>(searchQuery, 700)

    console.log(searchQuery)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const form = event.target;
        const query = form.value
        setSearchParams({search:query})
    }


    useEffect(() => {
        dispatch(sortPacksNameAC(debouncedValue))
    }, [debouncedValue])

    return (
        <div className={style.all_wrapper_search_packs}>
            <div className={style.title_search_pack}>
                Search
            </div>
            <Toolbar className={style.toolbar}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="go search..."
                        className={style.search_input}
                        onChange={handleChange}
                        value={searchQuery}
                    />
                </Search>
            </Toolbar>
        </div>
    );
};

