import React from 'react';
import style from './SearchPacks.module.css'
import SearchIcon from '@mui/icons-material/Search';
import {Toolbar} from '@mui/material';
import {Search,SearchIconWrapper,StyledInputBase} from '../../../../common/commonStyles/stylesForSearch'



export const SearchPacks = () => {
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
                        inputProps={{'aria-label': 'search'}}
                    />
                </Search>
            </Toolbar>
        </div>
    );
};

