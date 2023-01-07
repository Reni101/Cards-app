import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {createConnectionTC} from "./ChatReducer";

const Chat = () => {
    const dispatch = useAppDispatch()

    const messages = useAppSelector(state => state.Chat.messages)

    const messagesForRender = messages.map((el) => {
        return <div>name:{el.user.name} message:{el.message}</div>
    })

    useEffect(() => {
        debugger
        dispatch(createConnectionTC())
    }, [])

    return (
        <div>
            {messagesForRender}
        </div>
    );
};

export default Chat;