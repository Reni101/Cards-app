import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Reducer} from "./EmptyReducer";
import {ActionsProfileType, ProfilePageReducer} from "../pages/profilePage/profilePageReducer/ProfilePagerRedicer";
import {LoginReducer} from '../pages/login/loginReducer/LoginReducer';
import {AppReducer} from '../AppReducer';


const rootReducer = combineReducers({
    Reducer: Reducer,
    Profile:ProfilePageReducer,
    Login:LoginReducer,
    App:AppReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AllAppActionsType =  ActionsProfileType


export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllAppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllAppActionsType>

// @ts-ignore
window.store = store