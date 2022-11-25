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


type CardType = {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: number;
    shots: number; // сколько раз обучались по карточке
    created: string;
    updated: string;
}


type InitialStateType = {
    cards: CardType[];
    query: {
        pageCount:number
        cardQuestion: string // по вопросами
        sortCards: string  // сортировка по вопросам/ответам/грейду/обновлению
        cardsPack_id: string   //айдишка пака обязательно
    }
    packUserId: string | null; // айдишка юзера, всегда идёт в квери
    packName: string | null // название колоды
    packPrivate: boolean | null
    packCreated: string | null
    packUpdated: string | null


    page: number
    cardsTotalCount: number // всего карточек
}


const initialState: InitialStateType = {
    cards: [],
    query: {
        cardQuestion: '',
        sortCards: "",
        cardsPack_id: "", //айди колоды
        pageCount: 5,
    },
    packUserId: null, // айди юзера
    packName: null,
    packPrivate: null,
    packCreated: null,
    packUpdated: null,


    cardsTotalCount: 0,
    page: 1,

}


export const CardsReducer = (state: InitialStateType = initialState, action: ActionsCardsType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS':
            return {...state, ...action.payload}
        case "CARDS/CHANGE_PAGE ":
            return {...state, page: action.payload.page}
        case "CARDS/CHANGE_PAGE_COUNT":
            return {...state, query: {...state.query, pageCount: action.payload.pageCount}}
        case "CARDS/FIND_CARDS_QUESTION_AC":
            return {...state, query: {...state.query, cardQuestion: action.payload.cardQuestion}}
        case "CARDS/SORT_CARDS":
            return {...state, query: {...state.query, sortCards: action.payload.sortCards}}
        case "CARDS/SET_PACKS_ID":
            return {...state, query: {...state.query, cardsPack_id: action.payload.packsId}}
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
} as const)

export const sortCardsAC = (sortCards: string) => ({
    type: 'CARDS/SORT_CARDS',
    payload: {sortCards}
} as const)
export const setPacksIdAC = (packsId: string) => ({
    type: 'CARDS/SET_PACKS_ID',
    payload: {packsId}
} as const)


//==============================TC============================

export const setCardsTC = (cardsPack_id: string): AppThunk =>
    async (dispatch, getState) => {
        dispatch(setStatusApp('loading'))
        try {
            const page = getState().Cards.page
            const {cardQuestion, sortCards, pageCount} = getState().Cards.query
            const res = await cardsAPI.getCards({
                cardsPack_id, cardQuestion, sortCards, pageCount, page
            })
            dispatch(setCardsAC(res.data))
            dispatch(setPacksIdAC(cardsPack_id))

        } catch
            (e) {

        }
    }
export const AddCardTC = (card: RequestAddCardType): AppThunk => async (dispatch, getState) => {
    dispatch(setStatusApp('loading'))
    try {
        await cardsAPI.addCard(card)
        const packsId = getState().Cards.query.cardsPack_id
        dispatch(setCardsTC(packsId))
        dispatch(setStatusApp('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    } finally {
        dispatch(setStatusApp('idle'))
    }
}


export const UpdateCardTC = (card: RequestUpdateCardType): AppThunk => async (dispatch, getState) => {
    dispatch(setStatusApp('loading'))
    try {
        await cardsAPI.updateCard(card)
        const packsId = getState().Cards.query.cardsPack_id
        dispatch(setCardsTC(packsId))
        dispatch(setStatusApp('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    } finally {
        dispatch(setStatusApp('idle'))
    }
}


export const DeleteCardTC = (idCard: string): AppThunk => async (dispatch, getState) => {
    dispatch(setStatusApp('loading'))
    try {
        await cardsAPI.deleteCard(idCard)
        const packsId = getState().Cards.query.cardsPack_id
        dispatch(setCardsTC(packsId))
        dispatch(setStatusApp('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    } finally {
        dispatch(setStatusApp('idle'))
    }
}

