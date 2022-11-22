import {AppThunk} from "../../Redux/Store";
import {cardsAPI, ResponseCardsType} from "./CardsAPI";

export type ActionsCardsType =
    | ReturnType<typeof setCardsAC>

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
    packUserId: string | null;
    packName: string | null // название колоды
    packPrivate: boolean | null
    packCreated: string | null
    packUpdated: string | null
    currentPage: number | null
   // pageCount: 5 | 10 //количество карточек на странице
    cardsTotalCount: number | null // всего карточек
}


const initialState: InitialStateType = {
    cards: [],
    packUserId: null,
    packName: null,
    packPrivate: null,
    packCreated: null,
    packUpdated: null,
    cardsTotalCount: null,
    currentPage: null,
  //  pageCount: 10
}


export const CardsReducer = (state: InitialStateType = initialState, action: ActionsCardsType): InitialStateType => {
    switch (action.type) {
        case 'SET_CARDS':
            return {
                ...state,...action.payload.resObj
            }
        default:
            return state
    }
}
//=============================AC======================================
export const setCardsAC = (resObj: ResponseCardsType) => ({
    type: "SET_CARDS",
    payload: {
        resObj
    }
} as const)


//==============================TC============================

export const setCardsPackTC = (cardsPack_id:string): AppThunk =>
    async (dispatch, getState) => {
        try {
            const {
                 cardAnswer, cardQuestion,
                min, max, sortCards, page, pageCount
            } = getState().QueryParamsCards
            const res = await cardsAPI.getCards({
                cardsPack_id, cardAnswer, cardQuestion,
                min, max, sortCards, page, pageCount
            })
            dispatch(setCardsAC(res.data))
        } catch
            (e) {

        }
    }


