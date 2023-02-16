import {AxiosResponse} from "axios";
import {CardType} from "../redux/Cards-reducer";
import {instance} from "./api";


export const cardsApi = {
    getCards(params: queryCardsModelType) {
        return instance.get<ResponseCardsType>("cards/card", {params})
            .then(res => res.data)
    },
    addCard(card: RequestAddCardType) {
        return instance.post<{ card: RequestAddCardType }, AxiosResponse>("cards/card", {card})
    },
    updateCard(card: RequestUpdateCardType) {
        return instance.put("cards/card", {card: card}).then(res => res.data)
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