import {AppThunk} from "../../Redux/Store";


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
    page: number | null //текущая страница
    pageCount: 5 | 10 //колличество колод на странице
    cardPacksTotalCount: number | null //всего колод
    minCardsCount: number | null //мин количество карт в колоде
    maxCardsCount: number | null // макс
    sort: string | null// по какому параметру сортировать
    packName: string | null
    user_id: string | null
}


const initialState: InitialStateType = {
    cardPacks: [],

    cardPacksTotalCount: null,
    minCardsCount: null,
    maxCardsCount: null,

    page: null, // текущая страница
    pageCount: 10, // количество колод в на странице
    sort: null, // сортировка по возрастанию / убыванию
    packName: null, //сортировка по имени
    user_id: null // сортировка мои/чужие колоды
}


export const PacksReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_PACKS':
            return {...state,cardPacks : action.payload.packs}
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

export const setCardsPackTC = (): AppThunk => async dispatch => {
    try {
       // const res = packsAPI.getPacks({page,pageCount,sort,packName,user_id})
       // dispatch(setPacksAC(res.packs))
    } catch (e) {

    }
}


//

export type ActionsType =
    | ReturnType<typeof setPacksAC>

