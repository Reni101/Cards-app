import {instance} from "../../common/API/api";
import {AxiosResponse} from "axios";



export const cardsAPI = {
    getCards(model:queryCardsModelType) {
        return instance.get<ResponseCardsType>("cards/card", {
            params: model
        })
    },
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

export type ResponseCardsType = {
    cards: CardType[];
    packUserId: string;
    packName: string; // название колоды
    packPrivate: boolean;
    packCreated: string;
    packUpdated: string;
    page: number;
    pageCount: number; //количество карточек на странице
    cardsTotalCount: number; // всего карточек
}
export type CardType = {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: number;
    shots: number; // сколько раз обучались по карточке
    created: string;
    updated: string;
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

export type queryCardsModelType = {
    cardsPack_id: string | null // айдишка пака
    cardQuestion?: string | null // поиск по вопросами
    sortCards?: string | null // сортировка по вопросам/ответам/грейду/обновлению
    page?: number // страница
    pageCount: number
}