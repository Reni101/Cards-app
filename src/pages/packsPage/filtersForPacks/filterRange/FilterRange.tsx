import React, {useEffect} from 'react';
import style from './FilterRange.module.css'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {changeMaxAC, changeMinAC} from "../../PacksReducer";

const valuetext = (value: number) => {
    return `${value}°C`;
}

export const FilterRange = () => {

    const minCardsCount = useAppSelector(state => state.Packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.Packs.maxCardsCount)
    const packNameQuery = useAppSelector(state => state.Packs.query.packName)
    const user_idQuery = useAppSelector(state => state.Packs.query.user_id)
    const dispatch = useAppDispatch()

    const [value, setValue] = React.useState<number[]>([0,0]);

    const handleChange = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    const setValueHandler = () => {
      dispatch(changeMinAC(value[0]))
      dispatch(changeMaxAC(value[1]))
    }

    useEffect(() => {
        setValue([minCardsCount, maxCardsCount])
    }, [minCardsCount, maxCardsCount,packNameQuery,user_idQuery])
    return (
        <div className={style.all_wrapper_filter_range}>

            <div className={style.title_filter_range}>
                Number of cards
            </div>
            <div>{minCardsCount}</div>
            <div>{maxCardsCount}</div>
            <div className={style.slider_wrapper}>

                <Box sx={{width: 150}}>
                    <Slider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        min={minCardsCount}
                        max={maxCardsCount}
                        step={1}
                        onMouseUp={setValueHandler}

                    />

                </Box>

            </div>

        </div>
    );
};

