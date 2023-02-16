import {CardType} from "../redux/Cards-reducer";
import {instance} from "./api";

export const cardsLearnAPI = {
    getLearnCards(packId: string) {
        return instance.get<ResponseCardsType>(`cards/card?cardsPack_id=${packId}&pageCount=100`)
            .then(res => res.data)
    },
    updateGrade(grade: number, card_id: string) {
        return instance.put<ResponseCardGrade>("cards/grade", {grade, card_id})
            .then(res => res.data)
    }

}

export type ResponseCardsType = {
    cards: CardType[];
    packUserId: string;
    packName: string;
    pageCount: number;
}

export type ResponseCardGrade = {
    updatedGrade: UpdatedGradeType;
    token: string;
    tokenDeathTime: number;
}

export type UpdatedGradeType = {
    _id: string;
    cardsPack_id: string;
    card_id: string;
    user_id: string;
    grade: number;
    shots: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
}