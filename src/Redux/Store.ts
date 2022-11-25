import { combineReducers} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Reducer} from "./EmptyReducer";
import {ActionsProfileType, ProfilePageReducer} from "../pages/profilePage/ProfilePagerReducer";
import {ActionsForgotType, forgotPasswordReducer} from "../pages/passwordRecoveryPage/RecoveryPasswordReducer";

import {ActionsLoginType, LoginReducer} from '../pages/login/loginReducer/LoginReducer';
import {AppReducer, appReducersType} from '../AppReducer';

import {RegistrationActionType, RegistrationReducer} from "../pages/registrationPage/RegistrationReducer";
import {ActionsPacksType, PacksReducer} from "../pages/packsPage/PacksReducer";
import {ActionsCardsType, CardsReducer} from "../pages/cardsPage/CardsReducer";
import {configureStore} from "@reduxjs/toolkit";



const rootReducer = combineReducers({
    Reducer: Reducer,
    ProfilePage: ProfilePageReducer,
    ForgotPassword: forgotPasswordReducer,
    Login: LoginReducer,
    App: AppReducer,
    Registration: RegistrationReducer,
    Packs: PacksReducer,
    Cards: CardsReducer,

})

//export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export  const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware()
        .prepend(thunk)
})




export type AppRootStateType = ReturnType<typeof rootReducer>
export type AllAppActionsType =
    | ActionsProfileType
    | ActionsLoginType
    | ActionsForgotType
    | appReducersType
    | RegistrationActionType
    | ActionsPacksType
    | ActionsCardsType


export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllAppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllAppActionsType>

// @ts-ignore
window.store = store