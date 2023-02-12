import React from 'react';

type PropsType = {
    str: string,
    img: string,
}

export const AnswerCard = (props: PropsType) => {
    if (props.str === "no answer") {
        return (
            <div >
                <img style={{width:"80px"}} src={props.img} alt="no img"/>
            </div>
        )
    } else {
        return (
            <div>
                {props.str}
            </div>
        )
    }
};
