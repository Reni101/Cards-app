import {AppDispatch} from "./Store";
import {setStatusApp} from "./App-reducer";
import {AxiosError} from "axios";
import {handleError} from "../common/errorUtils/errorFunction";
import {cardsLearnAPI, ResponseCardsType, UpdatedGradeType} from "../api/Learn-api";
import {getRandomCard} from "../pages/learn/RandomCard";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardType} from "./Cards-reducer";

export type InitialLearnStateType = {
    cards: CardType[];
    randomCard: CardType | null
    packUserId: string | null
    packName: string | null
    packPrivate: boolean | null
    cardsTotalCount: number | null
}

const initialState: InitialLearnStateType = {
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
        user_id: "",
        questionImg:"",
        answerImg:""
    },
    packUserId: null,
    packName: null,
    packPrivate: null,
    cardsTotalCount: null
}

const slice = createSlice({
    name: "learnReducer",
    initialState: initialState,
    reducers: {
        setCardsLearnAC(state, action: PayloadAction<{ resObj: ResponseCardsType }>) {
            state.cards = action.payload.resObj.cards
            state.packUserId = action.payload.resObj.packUserId
            state.packName = action.payload.resObj.packName
        },
        generateRandomCardAC(state) {
            state.randomCard = getRandomCard(state.cards)
        },
        updateCardsAC(state, action: PayloadAction<{ newCard: UpdatedGradeType }>) {
            const index = state.cards.findIndex(el => el._id === action.payload.newCard.card_id)
            state.cards[index].shots = action.payload.newCard.shots
            state.cards[index].grade = action.payload.newCard.grade
        },
        clearLearnStateAC(state) {
            state.cards = []
            state.cardsTotalCount = null
            state.packName = null
            state.packPrivate = null
            state.packUserId = null
        },
    }
})
export const learnReducer = slice.reducer
export const {
    setCardsLearnAC, generateRandomCardAC,
    updateCardsAC, clearLearnStateAC
} = slice.actions


export const setLearnCardsTC = (cardsPack_id: string) =>
    async (dispatch: AppDispatch) => {
        dispatch(setStatusApp({status: 'loading'}))
        try {
            const res = await cardsLearnAPI.getLearnCards(cardsPack_id)
            dispatch(setCardsLearnAC({resObj: res}))
            dispatch(generateRandomCardAC())
            dispatch(setStatusApp({status: 'succeeded'}))
        } catch (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }
    }
export const updateGradeTC = (grade: number, cardId: string) =>
    async (dispatch: AppDispatch) => {
        dispatch(setStatusApp({status: 'loading'}))
        try {
            const res = await cardsLearnAPI.updateGrade(grade, cardId)
            dispatch(updateCardsAC({newCard: res.updatedGrade}))
            dispatch(generateRandomCardAC())
            dispatch(setStatusApp({status: 'succeeded'}))
        } catch (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }
    }
