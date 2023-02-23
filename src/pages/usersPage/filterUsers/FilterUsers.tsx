import React from 'react';
import style from './FilterUsers.module.css'
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export const FilterUsers = () => {

    const handleChange = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {


    };

    return (
        <div className={style.all_wrapper_filter_range}>

            <div className={style.title_filter_range}>
                Number of cards
            </div>
            <div className={style.slider_wrapper}>

                {/*<div className={style.count_value_wrapper}>{0}</div>*/}

                <Box sx={{width: 100}}>
                    <Slider
                        value={[0, 100]}
                        onChange={handleChange}
                        valueLabelDisplay="auto"

                        max={100}
                        step={1}
                    />
                </Box>
                {/*<div className={style.count_value_wrapper_right}>{100}</div>*/}
            </div>
        </div>
    );
};
