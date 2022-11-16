import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ActionsType, Reducer} from "./EmptyReducer";
import {ActionsProfileType, ProfilePageReducer} from "../pages/profilePage/ProfilePagerReducer";
import {ActionsForgotType, forgotPasswordReducer} from "../pages/passwordRecoveryPage/RecoveryPasswordReducer";

import {Reducer} from "./EmptyReducer";
import {ActionsLoginType, LoginReducer} from '../pages/login/loginReducer/LoginReducer';
import {AppReducer, appReducersType} from '../AppReducer';
import {ActionsProfileType, ProfilePageReducer} from '../pages/profilePage/profilePageReducer/ProfilePagerReducer';


const rootReducer = combineReducers({
    Reducer: Reducer,
    ProfilePage:ProfilePageReducer,
    ForgotPassword:forgotPasswordReducer
    Login:LoginReducer,
    App:AppReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AllAppActionsType =  ActionsProfileType | ActionsLoginType | ActionsForgotType |appReducersType



export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllAppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllAppActionsType>

// @ts-ignore
window.store = store