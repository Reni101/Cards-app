import React, {useEffect} from 'react';
import style from './FilterRange.module.css'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import useDebounce, {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import {changeMaxAC, changeMinAC} from '../../PacksReducer';
import {useSearchParams} from 'react-router-dom';

const valuetext = (value: number) => {
    return `${value}°C`;
}


export const FilterRange = () => {

    const maxCardsCount = useAppSelector(state => state.Packs.maxCardsCount)
    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQueryName = searchParams.get('search') || '';
    const searchQueryUserId = searchParams.get('user_id') || '';
    const searchQueryMin = searchParams.get('min') || '';
    const searchQueryMax = searchParams.get('max') || '';


    const max_value = Number(searchQueryMax) ? Number(searchQueryMax) : maxCardsCount
    const [value, setValue] = React.useState<number[]>([Number(searchQueryMin), Number(searchQueryMax)]);
    const debounceValue = useDebounce<number[]>(value, 700);


    useEffect(() => {
        dispatch(changeMinAC({min:debounceValue[0]}))
        dispatch(changeMaxAC({max:debounceValue[1]}))
    }, [debounceValue])


    const handleChange = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
        let [min_val, max_val] = newValue as number[]

        const params = {
            search: searchQueryName,
            user_id: searchQueryUserId,
            min: min_val.toString(),
            max: ''
        }
        max_val === 0 ? params.max = maxCardsCount.toString() : params.max = max_val.toString()
        setSearchParams(params)
        setValue(newValue as number[]);
    };


    return (
        <div className={style.all_wrapper_filter_range}>

            <div className={style.title_filter_range}>
                Number of cards
            </div>
            <div className={style.slider_wrapper}>
                <div className={style.count_value_wrapper}>{Number(searchQueryMin)}</div>
                <Box sx={{width: 100}}>
                    <Slider
                        value={[Number(searchQueryMin), max_value]}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        max={maxCardsCount}
                        step={1}
                    />
                </Box>
                <div className={style.count_value_wrapper_right}>{max_value}</div>
            </div>

        </div>
    );
};

