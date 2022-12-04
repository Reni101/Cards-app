import {instance} from "../../common/API/api";
import {AxiosResponse} from "axios";
import {CardType} from "./CardsReducer";


export const cardsAPI = {
    getCards(params: queryCardsModelType) {
        return instance.get<ResponseCardsType>("cards/card", {params})
    },
    addCard(card: RequestAddCardType) {
        return instance.post<{ card: RequestAddCardType }, AxiosResponse>("cards/card", {card})
    },
    updateCard(card: RequestUpdateCardType) {
        return instance.put("cards/card", {card: card})
    },
    deleteCard(idCard: string) {
        return instance.delete(`cards/card?id=${idCard}`)
    }
}

export type ResponseCardsType = {
    cards: CardType[];
    packUserId: string;
    packName: string
    packPrivate: boolean | null
    packCreated: string | null
    packUpdated: string | null
    page: number
    pageCount: number
    cardsTotalCount: number
}

export type RequestAddCardType = {
    cardsPack_id: string
    question: string
    answer: string
}

export type RequestUpdateCardType = {
    _id: string
    question: string,
    answer: string
}

export type queryCardsModelType = {
    cardsPack_id: string | null
    cardQuestion?: string | null
    sortCards?: string | null
    page?: number
    pageCount: number
}