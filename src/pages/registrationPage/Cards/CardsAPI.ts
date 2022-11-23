import {instance} from "../../../common/API/api";
import {AxiosResponse} from "axios";

export const CardsAPI = {
    addCard(card: RequestAddCardType) {
        instance.post<{ card: RequestAddCardType }, AxiosResponse>('cards/pack', {card: card})
    },
    updateCard(card: RequestUpdateCardType) {
        instance.put('cards/pack', {card: card})
    },
    deleteCard(idCard: string) {
        instance.delete(`cards/pack?id=${idCard}`)
    }
}

export type RequestAddCardType = {
    cardsPack_id: string
    question: string
    answer: string
}

export type RequestUpdateCardType = {
    _id: string
    question: string
}

