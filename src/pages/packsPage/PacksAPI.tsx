import {instance} from "../../common/API/api";

export type ResponseCardsType = {
    cardPacks: CardPacksType[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;

}
export type CardPacksType = {
    _id: string;
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    grade: number;
    shots: number;
    deckCover: string;
    cardsCount: number;
    created: string;
    updated: string;
}

export type queryModelType = {
    min: number | null,
    max: number | null,
    page: number | null,
    pageCount: 5 | 10 ,
    sortPacks: string | null,
    packName: string | null,
    user_id: string | null
}

export const packsAPI = {
    getPacks(model:queryModelType) {
        return instance.get<ResponseCardsType>("cards/pack", {
            params: model
        })
    }
}
