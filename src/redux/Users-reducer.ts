import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ResponseUsersType, User, usersApi} from "../api/Users-api";
import {AppDispatch, AppRootStateType} from "./Store";
import {setStatusApp} from "./App-reducer";
import {AxiosError} from "axios";
import {handleError} from "../common/errorUtils/errorFunction";


const initialState = {
    users: [] as Array<User>,
    page: 1 as number,
    pageCount: 10 as number,
    usersTotalCount: 0 as number,
    minPublicCardPacksCount: 0 as number,
    maxPublicCardPacksCount: 0 as number,
    sortUsers: "" as string
}


const slice = createSlice({
    name: "usersReducer",
    initialState: initialState,
    reducers: {
        setUsersAC(state, action: PayloadAction<ResponseUsersType>) {
            state.users = action.payload.users
            state.page = action.payload.page
            state.pageCount = action.payload.pageCount
            state.usersTotalCount = action.payload.usersTotalCount
            state.minPublicCardPacksCount = action.payload.minPublicCardPacksCount
            state.maxPublicCardPacksCount = action.payload.maxPublicCardPacksCount
        }
    }
})

export const usersReducer = slice.reducer
export const {setUsersAC} = slice.actions

export const setUsersTC = () =>
    async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
        dispatch(setStatusApp({status: 'loading'}))
        try {
            const {page, pageCount} = getState().Users

            const res = await usersApi.getUsers({
                page,
                pageCount,
                min: null,
                max: null,
                sortUsers: null,
                userName: null
            })


            dispatch(setUsersAC(res))
            dispatch(setStatusApp({status: 'succeeded'}))
        } catch
            (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }
    }