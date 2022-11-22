import {AppThunk} from "../../Redux/Store";


export type ActionsQueryCardsType =

    | ReturnType<typeof changePageCardsAC>


export type sortType = "name" | "updated" | "cardsCount" | "created"
export type sortOrder = "0" | "1"

type InitialStateType = {
    cardsPack_id: string | null // айдишка пака
    cardAnswer: string | null // поиск по ответам?
    cardQuestion: string | null // по вопросами
    min: number | null
    max: number | null
    sortCards: string | null // сортировка по вопросам/ответам/грейду/обновлению
    page: number | null // страница
    pageCount: 5 | 10
}

const initialState: InitialStateType = {
    //query params
    page: 1,
    cardAnswer: null,
    min: null,
    max: null,
    pageCount: 10,
    cardQuestion: null,
    sortCards: null,
    cardsPack_id: null

}


export const QueryParamsCardsReducer = (state: InitialStateType = initialState, action:ActionsQueryCardsType): InitialStateType => {
    switch (action.type) {
        case "CHANGE_PAGE_CARDS":
            return {...state, page:action.payload.page}
        default:
            return state
    }
}
//=============================AC======================================

export const changePageCardsAC = (page: number | null) => ({
    type: "CHANGE_PAGE_CARDS",
    payload: {
        page
    }
})

//==============================TC============================

export const changePageTC = (page: number | null): AppThunk =>
    async (dispatch) => {
        try {

        } catch
            (e) {
        }
    }


