import {instance} from "../../common/API/api";

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
	//minGrade: number;
	//maxGrade: number;
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
export type queryCardsModelType = {
	cardsPack_id: string | null // айдишка пака
	cardAnswer: string | null // поиск по ответам?
	cardQuestion: string | null // по вопросами
	min: number | null
	max: number | null
	sortCards: string | null // сортировка по вопросам/ответам/грейду/обновлению
	page: number | null // страница
	pageCount: 5 | 10
}

export const cardsAPI = {
    getCards(model:queryCardsModelType) {
        return instance.get<ResponseCardsType>("cards/card", {
        })
    }
}
