import React, {ChangeEvent, useEffect} from 'react';
import style from './SearchPacks.module.css'
import SearchIcon from '@mui/icons-material/Search';
import {Toolbar} from '@mui/material';
import {Search, SearchIconWrapper, StyledInputBase} from '../../../../common/commonStyles/stylesForSearch'
import {sortPacksNameAC} from '../../../../redux/Packs-reducer';
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../../redux/Store";
import useDebounce from "../../../../hooks/useDebounce";


export const SearchPacks = () => {
    const dispatch = useAppDispatch()
    const packName = useAppSelector(state => state.Packs.packName)

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQueryName = searchParams.get('search') || '';
    const searchQueryUserId = searchParams.get('user_id') || '';
    const searchQueryMin = searchParams.get('min') || '';
    const searchQueryMax = searchParams.get('max') || '';


    const debouncedValue = useDebounce<string>(searchQueryName, 700)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const form = event.target;
        const query = form.value
        const params = {
            search: query,
            user_id: searchQueryUserId,
            min: searchQueryMin,
            max: searchQueryMax
        }
        setSearchParams(params)
    }


    useEffect(() => {
        if (packName === debouncedValue) return
        dispatch(sortPacksNameAC({packName: debouncedValue}))
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
                        value={searchQueryName}
                    />
                </Search>
            </Toolbar>
        </div>
    );
};

