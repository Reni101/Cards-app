import React from 'react';
import style from './FilterRange.module.css'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const valuetext = (value: number) => {
    return `${value}°C`;
}

export const FilterRange = () => {
    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    return (
        <div className={style.all_wrapper_filter_range}>

            <div className={style.title_filter_range}>
                Number of cards
            </div>

            <div className={style.slider_wrapper}>
                <Box sx={{width: 150}}>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                </Box>
            </div>

        </div>
    );
};

