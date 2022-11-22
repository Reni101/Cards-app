import {AppThunk} from "../../Redux/Store";
import {packsAPI, ResponseCardsType} from "./PacksAPI";


type PacksType = {
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

export type ActionsPacksType =
    | ReturnType<typeof setPacksAC>

type InitialStateType = {
    cardPacks: Array<PacksType>
    cardPacksTotalCount: number | null //всего колод
    minCardsCount: number | null //мин количество карт в колоде
    maxCardsCount: number | null // макс
    currentPage: number | null //текущая страница

}


const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: null,
    minCardsCount: null,
    maxCardsCount: null,
    currentPage: null, // текущая страница
}


export const PacksReducer = (state: InitialStateType = initialState, action: ActionsPacksType): InitialStateType => {
    switch (action.type) {
        case 'SET_PACKS':
            return {
                ...state, cardPacks: action.payload.resObj.cardPacks,
                cardPacksTotalCount: action.payload.resObj.cardPacksTotalCount,
                minCardsCount: action.payload.resObj.minCardsCount,
                maxCardsCount: action.payload.resObj.maxCardsCount,
                currentPage: action.payload.resObj.page
            }
        default:
            return state
    }
}
//=============================AC======================================
export const setPacksAC = (resObj: ResponseCardsType) => ({
    type: "SET_PACKS",
    payload: {
        resObj
    }
} as const)


//==============================TC============================

export const setCardsPackTC = (): AppThunk =>
    async (dispatch, getState) => {
        try {
            const {min, max, page, pageCount, sortPacks, packName, user_id} = getState().QueryParamsPacks
            const res = await packsAPI.getPacks({min, max, page, pageCount, sortPacks, packName, user_id})
            dispatch(setPacksAC(res.data))
        } catch
            (e) {

        }
    }


