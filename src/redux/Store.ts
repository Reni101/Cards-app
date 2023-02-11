import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {profilePageReducer} from "../pages/profilePage/ProfilePagerReducer";
import {recoveryPasswordReducer} from "../pages/passwordRecoveryPage/RecoveryPasswordReducer";
import {loginReducer} from '../pages/login/LoginReducer';
import {appReducer} from '../AppReducer';
import {registrationReducer} from "../pages/registrationPage/RegistrationReducer";
import {packsReducer} from "../pages/packsPage/PacksReducer";
import {cardsReducer} from "../pages/cardsPage/CardsReducer";
import {configureStore} from "@reduxjs/toolkit";
import {learnReducer} from "../pages/learn/LearnReducer";
import {chatReducer} from "../pages/chatPage/ChatReducer";
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