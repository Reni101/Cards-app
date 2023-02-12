import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {profilePageReducer} from "./Profile-reducer";
import {recoveryPasswordReducer} from "../pages/passwordRecoveryPage/RecoveryPasswordReducer";
import {loginReducer} from './Login-reducer';
import {appReducer} from './App-reducer';
import {registrationReducer} from "./Registration-reducer";
import {packsReducer} from "./Packs-reducer";
import {cardsReducer} from "./Cards-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {learnReducer} from "./Learn-reducer";
import {chatReducer} from "./Chat-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({
    ProfilePage: profilePageReducer,
    ForgotPassword: recoveryPasswordReducer,
    Login: loginReducer,
    App: appReducer,
    Registration: registrationReducer,
    Packs: packsReducer,
    Cards: cardsReducer,
    Learn: learnReducer,
    Chat: chatReducer,

})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .prepend(thunk)
})


export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => <AppDispatch>useDispatch()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store