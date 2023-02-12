import {AppDispatch, AppRootStateType} from "./Store";
import {cardsApi, RequestAddCardType, RequestUpdateCardType, ResponseCardsType} from "../api/Cards-api";
import {setStatusApp} from "./App-reducer";
import {AxiosError} from "axios";
import {handleError} from "../common/errorUtils/errorFunction";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
    questionImg:string
    answerImg :string
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


const slice = createSlice({
    name: "CardsReducer",
    initialState: initialState,
    reducers: {
        setCardsAC(state, action: PayloadAction<{ resObj: ResponseCardsType }>) {
            state.cards = action.payload.resObj.cards
            state.packUserId = action.payload.resObj.packUserId
            state.packName = action.payload.resObj.packName
            state.packPrivate = action.payload.resObj.packPrivate
            state.packCreated = action.payload.resObj.packCreated
            state.packUpdated = action.payload.resObj.packUpdated
            state.page = action.payload.resObj.page
            state.pageCount = action.payload.resObj.pageCount
            state.cardsTotalCount = action.payload.resObj.cardsTotalCount
        },
        changePageCardsAC(state, action: PayloadAction<{ page: number }>) {
            state.page = action.payload.page
        },
        changePageCardsCountAC(state, action: PayloadAction<{ pageCount: number }>) {
            state.pageCount = action.payload.pageCount
        },
        findCardsQuestionAC(state, action: PayloadAction<{ cardQuestion: string }>) {
            state.cardQuestion = action.payload.cardQuestion
        },
        sortCardsAC(state, action: PayloadAction<{ sortCards: string }>) {
            state.sortCards = action.payload.sortCards
        },
        setPacksIdAC(state, action: PayloadAction<{ packsId: string }>) {
            state.cardsPack_id = action.payload.packsId
        },
        setPackNameForCardAC(state, action: PayloadAction<{ newPackName: string }>) {
            state.packName = action.payload.newPackName
        },
    }
})


export const cardsReducer = slice.reducer
export const {
    setCardsAC, changePageCardsAC, changePageCardsCountAC, findCardsQuestionAC,
    sortCardsAC, setPacksIdAC, setPackNameForCardAC
} = slice.actions


//==============================TC============================

export const setCardsTC = (cardsPack_id: string, questionSearch?: string) =>
    async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
        dispatch(setStatusApp({status: 'loading'}))
        try {
            let {page, cardQuestion, sortCards, pageCount} = getState().Cards
            if (sortCards === "") sortCards = null
            if (cardQuestion === "") cardQuestion = null
            if (!!questionSearch) cardQuestion = questionSearch
            const res = await cardsApi.getCards({
                cardsPack_id, cardQuestion, sortCards, pageCount, page
            })

            dispatch(setCardsAC({resObj: res}))
            dispatch(setPacksIdAC({packsId: cardsPack_id}))
            dispatch(setStatusApp({status: 'succeeded'}))

        } catch
            (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }
    }
export const addCardTC = (card: RequestAddCardType) =>
    async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
        dispatch(setStatusApp({status: 'loading'}))
        try {
            await cardsApi.addCard(card)
            const packsId = getState().Cards.cardsPack_id
            await dispatch(setCardsTC(packsId))
            dispatch(setStatusApp({status: 'succeeded'}))
        } catch (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        } finally {
            dispatch(setStatusApp({status: 'idle'}))
        }
    }

export const updateCardTC = (card: RequestUpdateCardType) =>
    async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
        dispatch(setStatusApp({status: 'loading'}))
        try {
            await cardsApi.updateCard(card)
            const packsId = getState().Cards.cardsPack_id
            dispatch(setCardsTC(packsId))
            dispatch(setStatusApp({status: 'succeeded'}))
        } catch (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        } finally {
            dispatch(setStatusApp({status: 'idle'}))
        }
    }


export const deleteCardTC = (idCard: string) =>
    async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
        dispatch(setStatusApp({status: 'loading'}))
        try {
            await cardsApi.deleteCard(idCard)
            const packsId = getState().Cards.cardsPack_id
            dispatch(setCardsTC(packsId))
            dispatch(setStatusApp({status: 'succeeded'}))
        } catch (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        } finally {
            dispatch(setStatusApp({status: 'idle'}))
        }
    }

