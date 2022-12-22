import React, {useState} from 'react';
import style from './CoverForTable.module.css'
import default_cover from '../../../../assets/book-education-learning-school-science-study-svgrepo-com.svg';

type CoverForTableProps = {
    cover?:string

}



export const CoverForTable = ({cover}:CoverForTableProps)=> {

    const [defSrc,setDefSrc]= useState<string>( cover!)
    const onError = () => setDefSrc(default_cover);


    return (
        <div className={style.image_wrapper}>
            <img src={defSrc ? defSrc : default_cover } onError={onError} alt="no photo"/>
        </div>
    );
};

