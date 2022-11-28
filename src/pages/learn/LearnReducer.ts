import {AppThunk} from "../../Redux/Store";
import {setStatusApp} from "../../AppReducer";
import {AxiosError} from "axios";
import {handleError} from "../../common/ErrorUtils/errorFunck";
import {cardsLearnAPI} from "./LearnAPI";
import {getRandomCard} from "./RandomCard";

export type ActionsLearnCardsType =
    | ReturnType<typeof setCardsLearnAC>
    | ReturnType<typeof setRandomCardsLearnAC>


export type CardLearnType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    rating: number
    grade: number
    shots: number // сколько раз обучались по карточке
    created: string
    updated: string
}


type InitialStateType = {
    cards: CardLearnType[];
    randomCard: CardLearnType
    packUserId: string
    packName: string
    packPrivate: boolean | null

}


const initialState: InitialStateType = {
    cards: [],
    randomCard: {
        _id: "",
        cardsPack_id: "",
        answer: "",
        question: "",
        created: "",
        grade: 0,
        rating: 0,
        shots: 0,
        updated: "",
        user_id: ""
    },
    packUserId: "",
    packName: "",
    packPrivate: null,
}


export const LearnReducer = (state: InitialStateType = initialState, action: ActionsLearnCardsType): InitialStateType => {
    switch (action.type) {
        case 'LEARN/SET_CARDS':
            return {...state, ...action.payload}
        case "LEARN/SET_RANDOM_CARD":
            return {...state, randomCard: action.payload.card}

        default:
            return state
    }
}
//=============================AC======================================
export const setCardsLearnAC = (resObj: any) => ({
    type: "LEARN/SET_CARDS",
    payload: resObj
} as const)

export const setRandomCardsLearnAC = (card: CardLearnType) => ({
    type: "LEARN/SET_RANDOM_CARD",
    payload: {card}
} as const)


//==============================TC============================

export const setLearnCardsTC = (cardsPack_id: string,): AppThunk =>
    async (dispatch, getState) => {
        dispatch(setStatusApp('loading'))
        try {
            const res = await cardsLearnAPI.getLearnCards(cardsPack_id)
            dispatch(setCardsLearnAC(res.data))
            dispatch(setRandomCardsLearnAC(getRandomCard(res.data.cards)))
            dispatch(setStatusApp('succeeded'))

        } catch
            (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }
    }
export const updateGradeTC = (grade: number, cardId: string): AppThunk =>
    async (dispatch, getState) => {
        dispatch(setStatusApp('loading'))
        try {
            const res = await cardsLearnAPI.updateGrade(grade, cardId)

            dispatch(setStatusApp('succeeded'))
        } catch
            (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }
    }
