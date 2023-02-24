import React, {ChangeEvent, useEffect} from 'react';
import style from './SearchUsers.module.css'
import {useAppDispatch} from "../../../redux/Store";
import useDebounce from "../../../hooks/useDebounce";
import {changeSearchNameAC} from "../../../redux/Users-reducer";
import {Toolbar} from "@mui/material";
import {Search, SearchIconWrapper, StyledInputBase} from "../../../common/commonStyles/stylesForSearch";
import SearchIcon from "@mui/icons-material/Search";
import {useSearchParams} from "react-router-dom";

export const SearchUsers = () => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const searchNameQuery = searchParams.get('searchName') || ""

    const debouncedValue = useDebounce<string>(searchNameQuery, 1000)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchParams({searchName: event.currentTarget.value})
    }


    useEffect(() => {
        dispatch(changeSearchNameAC(debouncedValue))
    }, [debouncedValue])

    return (
        <div className={style.all_wrapper_search_cards}>
            <div className={style.title_search_cards}>
                Search
            </div>
            <Toolbar className={style.toolbar}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Go search"
                        inputProps={{'aria-label': 'search'}}
                        onChange={handleChange}
                        className={style.search_input}
                        value={searchNameQuery}
                    />
                </Search>
            </Toolbar>
        </div>
    );
};
