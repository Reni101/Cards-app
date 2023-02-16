import {AxiosResponse} from "axios";
import {PacksType} from "../redux/Packs-reducer";
import {instance} from "./api";

export const packsApi = {
    getPacks(params?: queryModelType) {
        return instance.get<ResponsePacksType>("cards/pack", {params})
            .then(res => res.data)
    },
    addPack(cardsPack: RequestAddPackType) {
        return instance.post<{ name: string, deckCover: string }, AxiosResponse>('cards/pack', {cardsPack})
    },
    updatePack(cardsPack: RequestUpdatePackType) {
        return instance.put('cards/pack', {cardsPack})
    },
    deletePack(idPack: string) {
        return instance.delete(`cards/pack?id=${idPack}`)
    }
}

export type ResponsePacksType = {
    cardPacks: PacksType[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
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
    deckCover?: string
}

export type RequestUpdatePackType = {
    _id: string
    name: string | undefined
    deckCover?: string
}