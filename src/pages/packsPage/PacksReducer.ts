import {AppThunk} from "../../Redux/Store";
import {packsAPI, queryModelType} from "./packsAPI";


type CardPacksType = {
    _id: string // id колоды
    user_id: string
    user_name: string
    private: boolean
    name: string, // название колоды
    grade: number
    shots: number
    deckCover: string
    cardsCount: number, // количество карт в колоде
    created: string, //Date
    updated: string,//Date
    //  "path": "/def", ненужен
    //"type": "pack", не нужны
    // "rating": 0,
    // "more_id": "63517e98b84bdd1b506b681e",
    // "__v": 0
}
type InitialStateType = {
    cardPacks: Array<CardPacksType>
    cardPacksTotalCount: number | null //всего колод
    minCardsCount: number | null //мин количество карт в колоде
    maxCardsCount: number | null // макс

    page: number | null //текущая страница

    min: number | null,
    max: number | null,

    pageCount: 5 | 10 //колличество колод на странице
    sortPacks: string | null// по какому параметру сортировать
    packName: string | null
    user_id: string | null

}


const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: null,
    minCardsCount: null,
    maxCardsCount: null,

    page: null, // текущая страница

//query params
    min: null,
    max: null,

    pageCount: 10, // количество колод в на странице
    sortPacks: null, // сортировка по возрастанию / убыванию
    packName: null, //сортировка по имени
    user_id: null // сортировка мои/чужие колоды
}


export const PacksReducer = (state: InitialStateType = initialState, action: ActionsPacksType): InitialStateType => {
    switch (action.type) {
        case 'SET_PACKS':
            return {...state, cardPacks: action.payload.packs}
        default:
            return state
    }
}
//=============================AC======================================
export const setPacksAC = (packs: Array<CardPacksType>) => ({
    type: "SET_PACKS",
    payload: {
        packs
    }

} as const)


//==============================TC============================

export const setCardsPackTC = (): AppThunk =>
    async (dispatch, getState) => {
        try {
            const {min, max, page, pageCount, sortPacks, packName, user_id} = getState().Packs
            const queryParams: queryModelType = {
                min, max, page, pageCount, sortPacks, packName, user_id
            }
            const res = await packsAPI.getPacks(queryParams)
            dispatch(setPacksAC(res.data.cardPacks))
        } catch
            (e) {

        }
    }


//

export type ActionsPacksType =
    | ReturnType<typeof setPacksAC>

