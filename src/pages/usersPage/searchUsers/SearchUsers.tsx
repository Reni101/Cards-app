import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './SearchUsers.module.css'
import {useAppDispatch} from "../../../redux/Store";
import useDebounce from "../../../hooks/useDebounce";
import {changeSearchNameAC} from "../../../redux/Users-reducer";
import {Toolbar} from "@mui/material";
import {Search, SearchIconWrapper, StyledInputBase} from "../../../common/commonStyles/stylesForSearch";
import SearchIcon from "@mui/icons-material/Search";

export const SearchUsers = () => {

    const dispatch = useAppDispatch()
    const [name, setName] = useState("")
    const debouncedValue = useDebounce<string>(name, 1000)


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setName(event.currentTarget.value)
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
                    />
                </Search>
            </Toolbar>
        </div>
    );
};
