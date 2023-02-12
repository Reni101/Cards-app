import React, {ChangeEvent, useEffect} from 'react';
import style from './SearchCards.module.css';
import {Toolbar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {Search, SearchIconWrapper, StyledInputBase} from '../../../../common/commonStyles/stylesForSearch'
import useDebounce from '../../../../hooks/useDebounce';
import {findCardsQuestionAC} from "../../../../redux/Cards-reducer";
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../../redux/Store";


export const SearchCards = () => {

    const dispatch = useAppDispatch()
    const question = useAppSelector(state => state.Cards.cardQuestion)
    const packId = useAppSelector(state => state.Cards.cardsPack_id)

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQueryQuestName = searchParams.get('search_question') || '';

    const debouncedValue = useDebounce<string>(searchQueryQuestName, 700)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const form = event.target;
        const query = form.value
        setSearchParams({search_question: query})
    }

    useEffect(() => {
        if (question === debouncedValue) return
        dispatch(findCardsQuestionAC({cardQuestion: debouncedValue}))
    }, [debouncedValue])

    if (!packId) {
        return <></>
    }
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

