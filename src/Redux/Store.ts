import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ActionsType, Reducer} from "./EmptyReducer";
import {ActionsProfileType, ProfilePageReducer} from "../pages/profilePage/ProfilePagerReducer";
import {ActionsForgotType, forgotPasswordReducer} from "../pages/passwordRecoveryPage/RecoveryPasswordReducer";



const rootReducer = combineReducers({
    Reducer: Reducer,
    ProfilePage:ProfilePageReducer,
    ForgotPassword:forgotPasswordReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AllAppActionsType =  ActionsProfileType | ActionsType | ActionsForgotType


export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllAppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllAppActionsType>

// @ts-ignore
window.store = store