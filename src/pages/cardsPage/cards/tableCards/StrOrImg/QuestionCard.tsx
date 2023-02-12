import React from 'react';


type PropsType = {
    str: string,
    img: string,
}
export const QuestionCard = (props: PropsType) => {


    if (props.str === "no question") {
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

