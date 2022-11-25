import {instance} from "../../common/API/api";
import {AxiosResponse} from "axios";

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
    min?: number | null,
    max?: number | null,
    page?: number | null,
    pageCount?: number | null,
    sortPacks?: string | null,
    packName?: string | null,
    user_id?: string | null
}

export type RequestAddPackType = {
    name: string
}

export type RequestUpdatePackType = {
    _id: string
    name: string
}

export const packsAPI = {
    getPacks(model?:queryModelType) {
        return instance.get<ResponseCardsType>("cards/pack", {
            params: model
        })
    },
    addPack (cardsPack: RequestAddPackType) {
        instance.post<{name: string}, AxiosResponse>('cards/pack', {cardsPack: cardsPack})
    },
    updatePack (cardsPack: RequestUpdatePackType) {
        instance.put ('cards/pack', {
            cardsPack: cardsPack
        })
    },
    deletePack (idPack: string) {
        instance.delete(`cards/pack?id=${idPack}`)
    }
}
