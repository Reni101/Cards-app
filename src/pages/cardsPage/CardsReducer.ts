import {AppThunk} from "../../Redux/Store";
import {cardsAPI, ResponseCardsType} from "./CardsAPI";

export type ActionsCardsType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof changePageCardsAC>
    | ReturnType<typeof changePageCountAC>
    | ReturnType<typeof findCardsQuestionAC>
    | ReturnType<typeof sortCardsAC>

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
        page: number | null // страница
        pageCount: 5 | 10
        cardQuestion: string | null // по вопросами
        sortCards: string | null // сортировка по вопросам/ответам/грейду/обновлению
        cardsPack_id: string | null //айдишка пака обязательно
        // cardAnswer: string | null // поиск по ответам?
        // min: number | null
        // max: number | null
    }
    packUserId: string | null; // айдишка пака, всегда идёт в квери
    packName: string | null // название колоды
    packPrivate: boolean | null
    packCreated: string | null
    packUpdated: string | null
    page: number | null
    // pageCount: 5 | 10 //количество карточек на странице
    cardsTotalCount: number | null // всего карточек
}


const initialState: InitialStateType = {
    cards: [],
    query: {
        page: 1,
        pageCount: 10,
        cardQuestion: null,
        sortCards: null,
        cardsPack_id: null, //айди колоды
        // cardAnswer: null,
        // min: null,
        //max: null,

    },
    packUserId: null, // айди юзера
    packName: null,
    packPrivate: null,
    packCreated: null,
    packUpdated: null,
    cardsTotalCount: null,
    page: null,
    //  pageCount: 10
}


export const CardsReducer = (state: InitialStateType = initialState, action: ActionsCardsType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS':
            return {
                ...state, ...action.payload.resObj
            }
        case "CARDS/CHANGE_PAGE ":
            return {...state, query: {...state.query, page: action.payload.page}}
        case "CARDS/CHANGE_PAGE_COUNT":
            return {...state, query: {...state.query, pageCount: action.payload.pageCount}}
        case "CARDS/FIND_CARDS_QUESTION_AC":
            return {...state, query: {...state.query, cardQuestion: action.payload.cardQuestion}}
        case "CARDS/SORT_CARDS":
            return {...state, query: {...state.query, sortCards: action.payload.sortCards}}
        default:
            return state
    }
}
//=============================AC======================================
export const setCardsAC = (resObj: ResponseCardsType) => ({
    type: "CARDS/SET_CARDS",
    payload: {
        resObj
    }
} as const)

export const changePageCardsAC = (page: number | null) => ({
    type: 'CARDS/CHANGE_PAGE ',
    payload: {page}
} as const)

export const changePageCountAC = (pageCount: 5 | 10) => ({
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


//==============================TC============================

export const setCardsTC = (cardsPack_id: string | null): AppThunk =>
    async (dispatch, getState) => {
        try {
            const {cardQuestion, sortCards, page, pageCount} = getState().Cards.query
            const res = await cardsAPI.getCards({
                cardsPack_id, cardQuestion, sortCards, page, pageCount
            })
            dispatch(setCardsAC(res.data))
        } catch
            (e) {

        }
    }
export const changeCardsPageTC = (page:number | null): AppThunk =>
    async (dispatch,getState) => {
        try {
          dispatch(changePageCardsAC(page))
           const {cardsPack_id} = getState().Cards.cards[0]
            dispatch(setCardsTC(cardsPack_id))

        } catch
            (e) {

        }
    }


