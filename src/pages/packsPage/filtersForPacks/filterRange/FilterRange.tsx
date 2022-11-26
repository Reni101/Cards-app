import React, {useEffect} from 'react';
import style from './FilterRange.module.css'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import useDebounce, {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {changeMaxAC, changeMinAC} from "../../PacksReducer";

const valuetext = (value: number) => {
    return `${value}°C`;
}

export const FilterRange = () => {

    const min = useAppSelector(state => state.Packs.min)
    const max = useAppSelector(state => state.Packs.max)
    const maxCardsCount = useAppSelector(state => state.Packs.maxCardsCount)
    const dispatch = useAppDispatch()

    const [value, setValue] = React.useState<number[]>([min!, max!]);
    const debounceValue = useDebounce<number[]>(value, 600);


    useEffect(() => {
        dispatch(changeMinAC(debounceValue[0]))
        dispatch(changeMaxAC(debounceValue[1]))
    }, [debounceValue])


    const handleChange = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
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
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        max={maxCardsCount}
                        step={1}
                    />

                </Box>

            </div>

        </div>
    );
};

