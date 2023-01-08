import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {createConnectionTC, destroyConnectionTC} from "./ChatReducer";

const Chat = () => {
    const dispatch = useAppDispatch()

    const messages = useAppSelector(state => state.Chat.messages)

    const messagesForRender = messages.map((el) => {
        return <div>name:{el.user.name} message:{el.message}</div>
    })

    useEffect(() => {
        dispatch(createConnectionTC())

        return () => {
            dispatch(destroyConnectionTC())
        }
    }, [])

    return (
        <div>
            {messagesForRender}
        </div>
    );
};

export default Chat;