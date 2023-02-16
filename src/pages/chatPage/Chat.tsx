import React, {useEffect} from 'react';
import {createConnectionTC, destroyConnectionTC, sentMessageTC} from "../../redux/Chat-reducer";
import style from './Chat.module.css'
import {useAppDispatch, useAppSelector} from "../../redux/Store";

export const Chat = () => {
    const dispatch = useAppDispatch()
    const messages = useAppSelector(state => state.Chat.messages)

    const messagesForRender = messages.map((el) => {
        return <div>name:{el.user.name} message:{el.message}</div>
    })

    const sendMessageHandler = () => {
        dispatch(sentMessageTC("привет"))
    }

    useEffect(() => {
        dispatch(createConnectionTC())

        return () => {
            dispatch(destroyConnectionTC())
        }
    }, [])

    return (
        <div className={style.wrapper}>
            <h2>chat</h2>
            {messagesForRender}
            <button onClick={sendMessageHandler}>Send message</button>
        </div>
    );
};
