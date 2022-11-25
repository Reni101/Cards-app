import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './SearchPacks.module.css'
import SearchIcon from '@mui/icons-material/Search';
import {Toolbar} from '@mui/material';
import {Search, SearchIconWrapper, StyledInputBase} from '../../../../common/commonStyles/stylesForSearch'
import useDebounce, {useAppDispatch} from "../../../../hooks/hooks";
import {sortPacksNameAC} from "../../PacksReducer";


export const SearchPacks = () => {
    const dispatch = useAppDispatch()
    const [text, setText] = useState<string >("") // будет ругаться если пустой
    const debouncedValue = useDebounce<string>(text, 600) //дебаунс на 1 секунду
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    useEffect(() => {
        dispatch(sortPacksNameAC(debouncedValue))
    }, [debouncedValue]) // через секунду сетает новое имя на запрос

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
                        onChange={handleChange}
                    />
                </Search>
            </Toolbar>
        </div>
    );
};

