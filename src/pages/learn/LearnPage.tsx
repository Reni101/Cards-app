import * as React from 'react';
import {useEffect, useState} from 'react';
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
import {clearLearnStateAC, setLearnCardsTC, updateGradeTC} from "../../redux/Learn-reducer";
import {useAppDispatch, useAppSelector} from "../../redux/Store";
import {LinearProgress} from "@mui/material";
import {requestStatusType} from "../../redux/App-reducer";
import {Slide} from "react-awesome-reveal";


export const LearnPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {cardId} = useParams();
    const packName = useAppSelector(state => state.Learn.packName)
    const randomCard = useAppSelector(state => state.Learn.randomCard)
    const card_pack_id = useAppSelector(state => state.Cards.cardsPack_id)
    const status = useAppSelector<requestStatusType>(state => state.App.status)

    const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');

    useEffect(() => {
        dispatch(setLearnCardsTC(card_pack_id ? card_pack_id : cardId!))
        return () => {
            dispatch(clearLearnStateAC())
        }
    }, [dispatch])

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer((event.target as HTMLInputElement).value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (answer === '') {
            setHelperText('Choose answer');
            setError(true);
        } else {
            await dispatch(updateGradeTC(+answer, randomCard!._id))
            setError(false)
            setAnswer("")
            setIsShowAnswer(false)
            setHelperText("")
        }
    };

    const goToCards = () => {
        navigate(`/cards/${cardId}`)
    }

    return (
        <Slide direction={'down'}>
            <div className={style.wrapper}>
                <div className={style.go_to_pack_list} onClick={goToCards}>
                    <ArrowBackIcon style={{height: '15px'}}/>
                    Back to Cards List
                </div>

                <h1 className={style.title}>Learn "{packName}"</h1>

                <div className={style.mainBlock}>
                    {status === 'loading' && <LinearProgress color="primary"/>}
                    <div className={style.question}><b>Question:</b> {randomCard!.question}</div>
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
                        <form onSubmit={handleSubmit} className={style.formBlock}>
                            <FormControl error={error} variant="standard">
                                <FormLabel id="demo-error-radios">
                                    <div className={style.question}><b>Answer:</b>{randomCard!.answer}</div>
                                </FormLabel>
                                <RadioGroup className={style.answerBlock}
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
                                <FormHelperText className={style.helpText}>{helperText}</FormHelperText>
                                <Button type="submit"
                                        variant="outlined">
                                    Next
                                </Button>
                            </FormControl>
                        </form>}
                </div>
            </div>
        </Slide>
    );
}