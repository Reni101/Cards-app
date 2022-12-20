import {AppThunk} from "../../Redux/Store";
import {cardsAPI, RequestAddCardType, RequestUpdateCardType, ResponseCardsType} from "./CardsAPI";
import {setStatusApp} from "../../AppReducer";
import {AxiosError} from "axios";
import {handleError} from "../../common/ErrorUtils/errorFunck";

export type ActionsCardsType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof changePageCardsAC>
    | ReturnType<typeof changePageCardsCountAC>
    | ReturnType<typeof findCardsQuestionAC>
    | ReturnType<typeof sortCardsAC>
    | ReturnType<typeof setPacksIdAC>
    | ReturnType<typeof setPackNameForCardAC>


export type CardType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    rating: number
    grade: number
    shots: number
    created: string
    updated: string
}


export type InitialStateType = {
    cards: CardType[];
    packUserId: string
    packName: string
    packPrivate: boolean | null
    packCreated: string | null
    packUpdated: string | null
    page: number
    pageCount: number
    cardsTotalCount: number
    cardQuestion: string | null
    sortCards: string | null
    cardsPack_id: string
}


const initialState: InitialStateType = {
    cards: [],
    packUserId: "",
    packName: "",
    packPrivate: null,
    packCreated: null,
    packUpdated: null,
    page: 1,
    pageCount: 5,
    cardsTotalCount: 0,
    cardQuestion: null,
    sortCards: "",
    cardsPack_id: "",


}


export const CardsReducer = (state: InitialStateType = initialState, action: ActionsCardsType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS':
            return {...state, ...action.payload}
        case "CARDS/CHANGE_PAGE ":
            return {...state, page: action.payload.page}
        case "CARDS/CHANGE_PAGE_COUNT":
            return {...state, pageCount: action.payload.pageCount}
        case "CARDS/FIND_CARDS_QUESTION_AC":
            return {...state, cardQuestion: action.payload.cardQuestion}
        case "CARDS/SORT_CARDS":
            return {...state, sortCards: action.payload.sortCards}
        case "CARDS/SET_PACKS_ID":
            return {...state, cardsPack_id: action.payload.packsId}
        case 'CARDS/SET_PACK_NAME_FOR_CARD':
            return {...state, packName: action.payload.newPackName}
        default:
            return state
    }
}
//=============================AC======================================
export const setCardsAC = (resObj: ResponseCardsType) => ({
    type: "CARDS/SET_CARDS",
    payload: resObj
} as const)

export const changePageCardsAC = (page: number) => ({
    type: 'CARDS/CHANGE_PAGE ',
    payload: {page}
} as const)

export const changePageCardsCountAC = (pageCount: number) => ({
    type: 'CARDS/CHANGE_PAGE_COUNT',
    payload: {pageCount}
} as const)

export const findCardsQuestionAC = (cardQuestion: string) => ({
    type: 'CARDS/FIND_CARDS_QUESTION_AC',
    payload: {cardQuestion}
}as const)


export const sortCardsAC = (sortCards: string) => ({
    type: 'CARDS/SORT_CARDS',
    payload: {sortCards}
} as const)
export const setPacksIdAC = (packsId: string) => ({
    type: 'CARDS/SET_PACKS_ID',
    payload: {packsId}
} as const)
export const setPackNameForCardAC = (newPackName: string) => ({
    type: 'CARDS/SET_PACK_NAME_FOR_CARD',
    payload: {newPackName}
} as const)


//==============================TC============================

export const setCardsTC = (cardsPack_id: string,questionSearch?:string): AppThunk =>
    async (dispatch, getState) => {
        dispatch(setStatusApp({status:'loading'}))
        try {
            let {page, cardQuestion, sortCards, pageCount} = getState().Cards
            if (sortCards === "") sortCards = null
            if (cardQuestion === "") cardQuestion = null
            if (!!questionSearch) cardQuestion = questionSearch

            const res = await cardsAPI.getCards({
                cardsPack_id, cardQuestion, sortCards, pageCount, page
            })

            dispatch(setCardsAC(res.data))
            dispatch(setPacksIdAC(cardsPack_id))
            dispatch(setStatusApp({status: 'succeeded'}))

        } catch
            (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }
    }
export const AddCardTC = (card: RequestAddCardType): AppThunk => async (dispatch, getState) => {
    dispatch(setStatusApp({status:'loading'}))
    try {
        await cardsAPI.addCard(card)
        const packsId = getState().Cards.cardsPack_id
        await dispatch(setCardsTC(packsId))
        dispatch(setStatusApp({status:'succeeded'}))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    } finally {
        dispatch(setStatusApp({status:'idle'}))
    }
}

export const UpdateCardTC = (card: RequestUpdateCardType): AppThunk => async (dispatch, getState) => {
    dispatch(setStatusApp({status:'loading'}))
    try {
        await cardsAPI.updateCard(card)
        const packsId = getState().Cards.cardsPack_id
        dispatch(setCardsTC(packsId))
        dispatch(setStatusApp({status:'succeeded'}))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    } finally {
        dispatch(setStatusApp({status:'idle'}))
    }
}


export const DeleteCardTC = (idCard: string): AppThunk => async (dispatch, getState) => {
    dispatch(setStatusApp({status:'loading'}))
    try {
        await cardsAPI.deleteCard(idCard)
        const packsId = getState().Cards.cardsPack_id
        dispatch(setCardsTC(packsId))
        dispatch(setStatusApp({status:'succeeded'}))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    } finally {
        dispatch(setStatusApp({status:'idle'}))
    }
}

