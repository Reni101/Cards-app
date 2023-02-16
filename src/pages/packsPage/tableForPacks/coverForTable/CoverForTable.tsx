import React from 'react';
import style from './CoverForTable.module.css'
import default_cover from '../../../../assets/book-education-learning-school-science-study-svgrepo-com.svg';

type CoverForTableProps = {
    cover?: string
}

export const CoverForTable = ({cover}: CoverForTableProps) => {
    return (
        <div className={style.image_wrapper}>
            <img src={cover ? cover : default_cover} alt="no photo"/>
        </div>
    );
};

