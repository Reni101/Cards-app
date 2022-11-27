import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './SearchPacks.module.css'
import SearchIcon from '@mui/icons-material/Search';
import {Toolbar} from '@mui/material';
import {Search, SearchIconWrapper, StyledInputBase} from '../../../../common/commonStyles/stylesForSearch'
import useDebounce, {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {sortPacksNameAC} from "../../PacksReducer";


export const SearchPacks = () => {
    let packName = useAppSelector(state => state.Packs.packName)
    const dispatch = useAppDispatch()
    const [text, setText] = useState<string>(packName!)
    const debouncedValue = useDebounce<string>(text, 600)


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
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
                        value={text}

                    />
                </Search>
            </Toolbar>
        </div>
    );
};

