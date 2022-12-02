import React from 'react';
import style from './LottieNoSearch.module.css';
import {AnimationWaiting} from '../LottieAnimationNotFound';

interface LottieNoSearchProps {
    error_name:string
}

export const LottieNoSearch = ({error_name}:LottieNoSearchProps) => {
    return (
        <div className={style.empty_pack}>
            <div className={style.empty_text}>{error_name}</div>
            <div><AnimationWaiting/></div>
        </div>
    );
};

