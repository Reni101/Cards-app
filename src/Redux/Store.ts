import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Reducer} from "./EmptyReducer";
import {ActionsProfileType, ProfilePageReducer} from "../pages/profilePage/ProfilePagerReducer";
import {ActionsForgotType, forgotPasswordReducer} from "../pages/passwordRecoveryPage/RecoveryPasswordReducer";

import {ActionsLoginType, LoginReducer} from '../pages/login/loginReducer/LoginReducer';
import {AppReducer, appReducersType} from '../AppReducer';

import {RegistrationActionType, RegistrationReducer} from "./RegistrationReducer";



const rootReducer = combineReducers({
    Reducer: Reducer,
    ProfilePage: ProfilePageReducer,
    ForgotPassword: forgotPasswordReducer,
    Login: LoginReducer,
    App: AppReducer,
    Registration: RegistrationReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AllAppActionsType =
    | ActionsProfileType
    | ActionsLoginType
    | ActionsForgotType
    | appReducersType
    | RegistrationActionType


export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllAppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllAppActionsType>

// @ts-ignore
window.store = store