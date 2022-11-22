import {AppThunk} from "../../Redux/Store";

export type ActionsQueryCardsType =
    | ReturnType<typeof changePageCardsAC>
    | ReturnType<typeof changePageCountAC>


type InitialStateType = {
    page: number | null // страница
    pageCount: 5 | 10

    min: number | null
    max: number | null

    cardAnswer: string | null // поиск по ответам?
    cardQuestion: string | null // по вопросами

    cardsPack_id: string | null // айдишка пака обязательно
    sortCards: string | null // сортировка по вопросам/ответам/грейду/обновлению

}

const initialState: InitialStateType = {
    //query params
    page: 1,
    pageCount: 10,

    min: null,
    max: null,

    cardAnswer: null,
    cardQuestion: null,


    sortCards: null,
    cardsPack_id: null

}


export const QueryParamsCardsReducer = (state: InitialStateType = initialState, action: ActionsQueryCardsType): InitialStateType => {
    switch (action.type) {
        case "CARDS_QUERY/CHANGE_PAGE ":
            return {...state, page: action.payload.page}
        case "CARDS_QUERY/CHANGE_PAGE_COUNT":
            return {...state, pageCount: action.payload.pageCount}
        default:
            return state
    }
}
//=============================AC======================================
export const changePageCardsAC = (page: number | null) => ({
    type: 'CARDS_QUERY/CHANGE_PAGE ',
    payload: {page}
} as const)

export const changePageCountAC = (pageCount: 5 | 10) => ({
    type: 'CARDS_QUERY/CHANGE_PAGE_COUNT',
    payload: {pageCount}

} as const)


//==============================TC============================

export const TC = (): AppThunk => async dispatch => {

}

//





