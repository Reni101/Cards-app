import {instance} from "../../common/API/api";


export const cardsLearnAPI = {
    getLearnCards(packId: string) {
        return instance.get<ResponseCardsType>(`cards/card?cardsPack_id=${packId}&pageCount=100`,)

    },
    updateGrade(grade: number, card_id: string) {
        return instance.put<ResponseCardGrade>("cards/grade", {grade, card_id}
        )
    }

}

export type ResponseCardsType = {
    cards: CardType[];
    packUserId: string;
    packName: string; // название колоды
    pageCount: number; //количество карточек на странице
}
export type CardType = {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    rating: number
    more_id: string
    grade: number
    shots: number // сколько раз обучались по карточке
    created: string
    updated: string
}

export type ResponseCardGrade= {
	updatedGrade: UpdatedGradeType;
	token: string;
	tokenDeathTime: number;
}
export type UpdatedGradeType ={
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