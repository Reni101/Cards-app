import {instance} from "../../../common/API/api";
import {AxiosResponse} from "axios";

export const PacksAPI = {
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

export type RequestAddPackType = {
        name: "no Name"
}

export type RequestUpdatePackType = {
    _id: string
    name: string
}
