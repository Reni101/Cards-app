import {combineReducers} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {ActionsProfileType, ProfilePageReducer} from "../pages/profilePage/ProfilePagerReducer";
import {ActionsRecoveryType, recoveryPasswordReducer} from "../pages/passwordRecoveryPage/RecoveryPasswordReducer";
import {ActionsLoginType, LoginReducer} from '../pages/login/loginReducer/LoginReducer';
import {AppReducer, appReducersType} from '../AppReducer';
import {RegistrationActionType, RegistrationReducer} from "../pages/registrationPage/RegistrationReducer";
import {ActionsPacksType, PacksReducer} from "../pages/packsPage/PacksReducer";
import {ActionsCardsType, CardsReducer} from "../pages/cardsPage/CardsReducer";
import {configureStore} from "@reduxjs/toolkit";
import {ActionsLearnType, learnReducer} from "../pages/learn/LearnReducer";
import {ChatActionType, ChatReducer} from "../pages/chatPage/ChatReducer";


const rootReducer = combineReducers({
    ProfilePage: ProfilePageReducer,//М //t +
    ForgotPassword: recoveryPasswordReducer,//M//t +
    Login: LoginReducer,//I t
    App: AppReducer,//I t
    Registration: RegistrationReducer,//A t
    Packs: PacksReducer,//I t
    Cards: CardsReducer,//M t+
    Learn: learnReducer,//М t+
    Chat: ChatReducer,

})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .prepend(thunk)
})


export type AppRootStateType = ReturnType<typeof rootReducer>

export type AllAppActionsType =
    | ActionsLoginType
    | appReducersType
    | RegistrationActionType
    | ActionsPacksType
    | ActionsProfileType
    | ActionsRecoveryType
    | ActionsCardsType
    | ActionsLearnType
    | ChatActionType


export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllAppActionsType>

// @ts-ignore
window.store = store