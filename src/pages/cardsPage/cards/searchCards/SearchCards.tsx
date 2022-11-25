import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './SearchCards.module.css';
import {Toolbar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {Search,SearchIconWrapper,StyledInputBase} from '../../../../common/commonStyles/stylesForSearch'
import useDebounce, {useAppDispatch} from "../../../../hooks/hooks";
import {findCardsQuestionAC} from "../../CardsReducer";




export const SearchCards = () => {


    const dispatch = useAppDispatch()
    const [text, setText] = useState<string >("") // будет ругаться если пустой
    const debouncedValue = useDebounce<string>(text, 600) //дебаунс на 1 секунду
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    useEffect(() => {
        dispatch(findCardsQuestionAC(debouncedValue))
    }, [debouncedValue]) // через секунду сетает новое имя на запрос



    return (
        <div className={style.all_wrapper_search_cards}>
            <div className={style.title_search_cards}>
                Search
            </div>
            <Toolbar className={style.toolbar}>
                <Search >
                    <SearchIconWrapper >
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Go search"
                        inputProps={{'aria-label': 'search'}}
                        onChange={handleChange}
                    />
                </Search>
            </Toolbar>
        </div>
    );
};

