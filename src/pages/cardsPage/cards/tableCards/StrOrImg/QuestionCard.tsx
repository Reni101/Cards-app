import React from 'react';


type PropsType = {
    str: string,
    img: string,
}
export const QuestionCard = (props: PropsType) => {


    if (props.str === "no question") {
        return (
            <div>
                <img style={{width: "70px"}} src={props.img} alt="no img"/>
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

