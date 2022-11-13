import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Reducer} from "./EmptyReducer";
import {ActionsProfileType, ProfilePageReducer} from "../pages/profilePage/profilePageReducer/ProfilePagerRedicer";
import {RegistrationReducer, SetRegisrationACType} from "./RegistrationReducer";


const rootReducer = combineReducers({
    Reducer: Reducer,
    Profile:ProfilePageReducer,
    Registration: RegistrationReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AllAppActionsType =  ActionsProfileType | SetRegisrationACType


export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllAppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllAppActionsType>

// @ts-ignore
window.store = store