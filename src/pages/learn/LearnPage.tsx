/*




export const LearnPage = () => {

    const [answer, setAnswer] = React.useState('');

    const [first, setFirst] = useState<boolean>(true);
    // const [first, setFirst] = useState<boolean>(0);
    const cards = useAppSelector(state => state.Cards.cards);
    const id = useAppSelector(state => state.Cards.cardsPack_id)
    // const {id} = useParams();


    const dispatch = useDispatch();
    /!*    useEffect(() => {
            if (first) {
                //  dispatch(getCards(id));
                setFirst(false);
            }

            //console.log('cards', cards)
            //  if (cards.length > 0) setCard(getCard(cards));

            return () => {
            }
        }, [dispatch, id, cards, first]);//!*!/

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            // dispatch
            // setCard(getCard(cards));
        } else {

        }
    }

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setAnswer((event.target as HTMLInputElement).value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const val = answer
        debugger

    };
    // DEV_VERSION && console.log('render LearnPage');
    return (
        <div className={style.wrapper}>












                <form onSubmit={handleSubmit}>
                    <FormControl variant="standard">
                        <FormLabel id="demo-error-radios">
                            <div className={style.question}><b>Answer:</b>{"card.answer"}</div>
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-error-radios"
                            value={answer}
                            onChange={handleRadioChange}
                        >
                            <FormControlLabel value="1" control={<Radio/>} label="Did not know"/>
                            <FormControlLabel value="2" control={<Radio/>} label="Forgot"/>
                            <FormControlLabel value="3" control={<Radio/>} label="A lot of thought"/>
                            <FormControlLabel value="4" control={<Radio/>} label="Confuse"/>
                            <FormControlLabel value="5" control={<Radio/>} label="Knew the answer"/>
                        </RadioGroup>
                        <Button type="submit"
                                variant="outlined"
                                style={{margin: '30px 10px'}}>
                            Check Answer
                        </Button>
                    </FormControl>
                </form>


            </div>
        </div>)
};
*/
import * as React from 'react';
import style from "./Learn.module.css"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate, useParams} from "react-router-dom";
import {packsRoute} from "../../common/paths/Paths";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

import {
    setLearnCardsTC,
    updateGradeTC
} from "./LearnReducer";


export const LearnPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const packName = useAppSelector(state => state.Learn.packName)
    const randomCard = useAppSelector(state => state.Learn.randomCard)
    const card_pack_id = useAppSelector(state => state.Cards.cardsPack_id)
    let {cardId} = useParams();


    const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('Choose');


    useEffect(() => {

        if (randomCard === null) return
        dispatch(setLearnCardsTC(card_pack_id ? card_pack_id : cardId!))


    }, [])

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer((event.target as HTMLInputElement).value);

    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await dispatch(updateGradeTC(+answer, randomCard!._id))
        setIsShowAnswer(false)


    };


    const goToPacks = () => {
        navigate(packsRoute)
    }
    return (

        <div className={style.wrapper}>

            <div className={style.go_to_pack_list} onClick={goToPacks}>
                <ArrowBackIcon style={{height: '15px'}}/>
                Back to Packs List
            </div>
            <h1 className={style.title}>Learn "{packName}"</h1>

            <div className={style.mainBlock}>


                <div className={style.question}><b>Question:</b> :{randomCard!.question}</div>
                <div className={style.text}>Количество попыток ответов на вопрос: {randomCard!.shots}</div>
                {!isShowAnswer &&
                    <div>
                        <Button onClick={() => setIsShowAnswer(true)}
                                style={{marginBottom: '30px', width: "70%"}}
                                variant="outlined"
                        >
                            Show answer
                        </Button>
                    </div>}


                {isShowAnswer &&
                    <form onSubmit={handleSubmit}>
                        <FormControl error={error} variant="standard">
                            <FormLabel id="demo-error-radios">
                                <div className={style.question}><b>Answer:</b>{randomCard!.answer}</div>
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-error-radios"
                                name="quiz"
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel value="1" control={<Radio/>} label="Did not know"/>
                                <FormControlLabel value="2" control={<Radio/>} label="Forgot"/>
                                <FormControlLabel value="3" control={<Radio/>} label="A lot of thought"/>
                                <FormControlLabel value="4" control={<Radio/>} label="Confuse"/>
                                <FormControlLabel value="5" control={<Radio/>} label="Knew the answer"/>
                            </RadioGroup>
                            <FormHelperText>{helperText}</FormHelperText>
                            <Button type="submit"
                                    style={{marginBottom: "30px", width: "231px"}}
                                    variant="outlined"

                            >

                                Next
                            </Button>
                        </FormControl>
                    </form>}
            </div>
        </div>
    );
}