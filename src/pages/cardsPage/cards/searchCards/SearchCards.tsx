import React from 'react';
import style from './SearchCards.module.css';
import {Toolbar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {Search,SearchIconWrapper,StyledInputBase} from '../../../../common/commonStyles/stylesForSearch'




export const SearchCards = () => {
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
                    />
                </Search>
            </Toolbar>
        </div>
    );
};

