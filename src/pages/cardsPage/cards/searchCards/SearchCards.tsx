import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './SearchCards.module.css';
import {Toolbar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {Search, SearchIconWrapper, StyledInputBase} from '../../../../common/commonStyles/stylesForSearch'
import useDebounce, {useAppDispatch} from "../../../../hooks/hooks";
import {findCardsQuestionAC} from "../../CardsReducer";


export const SearchCards = () => {


    const dispatch = useAppDispatch()
    const [text, setText] = useState<string>("")
    const debouncedValue = useDebounce<string>(text, 600)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    useEffect(() => {
        dispatch(findCardsQuestionAC(debouncedValue))
    }, [dispatch,debouncedValue])


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

