import React, {useEffect} from 'react';
import style from './FilterRange.module.css'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import useDebounce, {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {changeMaxAC, changeMinAC} from "../../PacksReducer";
import {useSearchParams} from 'react-router-dom';

const valuetext = (value: number) => {
    return `${value}°C`;
}

export const FilterRange = () => {

    const maxCardsCount = useAppSelector(state => state.Packs.maxCardsCount)
    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQueryMin = searchParams.get('min') || '';
    const searchQueryMax = searchParams.get('max') || '';



    const [value, setValue] = React.useState<number[]>([Number(searchQueryMin),Number(searchQueryMax)]);
    const debounceValue = useDebounce<number[]>(value, 700);


    useEffect(() => {
        dispatch(changeMinAC(debounceValue[0]))
        dispatch(changeMaxAC(debounceValue[1]))
    }, [debounceValue])


    const handleChange = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
        const [min,max] = newValue as number[]
        setSearchParams({min: min.toString(), max: max.toString()})
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

