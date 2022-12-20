import {AppThunk} from "../../Redux/Store";
import {setStatusApp} from "../../AppReducer";
import {AxiosError} from "axios";
import {handleError} from "../../common/ErrorUtils/errorFunck";
import {cardsLearnAPI, UpdatedGradeType} from "./LearnAPI";
import {getRandomCard} from "./RandomCard";

export type ActionsLearnCardsType =
    | ReturnType<typeof setCardsLearnAC>
    | ReturnType<typeof setRandomCardsLearnAC>
    | ReturnType<typeof generateRandomCardAC>
    | ReturnType<typeof updateCardsAC>
    | ReturnType<typeof clearLearnStateAC>


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


export type InitialStateType = {
    cards: CardLearnType[];
    randomCard: CardLearnType | null
    packUserId: string | null
    packName: string | null
    packPrivate: boolean | null
    cardsTotalCount:number | null

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
    packUserId: null,
    packName: null,
    packPrivate: null,
    cardsTotalCount:null
}


export const LearnReducer = (state: InitialStateType = initialState, action: ActionsLearnCardsType): InitialStateType => {
    switch (action.type) {
        case 'LEARN/SET_CARDS':
            return {...state, ...action.payload}
        case "LEARN/SET_RANDOM_CARD":
            return {...state, randomCard: action.payload.card}
        case "LEARN/GENERATE_RANDOM_CARD":
            return {...state, randomCard: getRandomCard(state.cards)}
        case "LEARN/UPDATE_CARDS":
            return {
                ...state, cards: state.cards.map(el => el._id === action.payload.card_id ? {
                    ...el,
                    shots: action.payload.shots,
                    grade: action.payload.grade
                } : el)
            }
        case "LEARN/CLEAR_STATE":{
            return {...state,cards:[],cardsTotalCount:null,packName:null,packPrivate:null,packUserId:null}
        }
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

export const generateRandomCardAC = () => ({
    type: "LEARN/GENERATE_RANDOM_CARD"
} as const)
export const updateCardsAC = (newCard: UpdatedGradeType) => ({
    type: "LEARN/UPDATE_CARDS",
    payload: newCard
} as const)
export const clearLearnStateAC = () => ({
    type: "LEARN/CLEAR_STATE",
} as const)


//==============================TC============================

export const setLearnCardsTC = (cardsPack_id: string,): AppThunk =>
    async (dispatch) => {
        dispatch(setStatusApp({status:'loading'}))
        try {
            const res = await cardsLearnAPI.getLearnCards(cardsPack_id)
            dispatch(setCardsLearnAC(res.data))
            dispatch(setRandomCardsLearnAC(getRandomCard(res.data.cards)))
            dispatch(setStatusApp({status:'succeeded'}))

        } catch
            (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }
    }
export const updateGradeTC = (grade: number, cardId: string): AppThunk =>
    async (dispatch) => {
        dispatch(setStatusApp({status:'loading'}))
        try {
            const res = await cardsLearnAPI.updateGrade(grade, cardId)
            dispatch(updateCardsAC(res.data.updatedGrade))
            dispatch(generateRandomCardAC())
            dispatch(setStatusApp({status:'succeeded'}))
        } catch
            (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }
    }
