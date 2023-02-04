import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {createConnectionTC, destroyConnectionTC, sentMessageTC} from "./ChatReducer";
import style from './Chat.module.css'

const Chat = () => {
    const dispatch = useAppDispatch()

    const messages = useAppSelector(state => state.Chat.messages)
    const userid = useAppSelector(state => state.ProfilePage.user_id)
    const name = useAppSelector(state => state.ProfilePage.name)
    const messagesForRender = messages.map((el) => {
        return <div>name:{el.user.name} message:{el.message}</div>
    })

    const sendMessageHandler = () => {
        dispatch(sentMessageTC("привет"))
    }

    useEffect(() => {
        dispatch(createConnectionTC(userid, name!, null))

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

export default Chat;