import React from 'react';

type PropsType = {
    str: string,
    img: string,
}

export const AnswerCard = (props: PropsType) => {
    if (props.str === "no answer") {
        return (
            <div>
                <img src={props.img} alt=""/>
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
