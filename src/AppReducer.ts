

export type requestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type appInitialStateType = {
    status: requestStatusType
    error: string | null
}
const InitialState:appInitialStateType = {
    status: 'idle',
    error: null
}
export const AppReducer =(state:appInitialStateType = InitialState,action:appReducersType):appInitialStateType => {

    switch(action.type) {
        case 'APP/SET_ERROR': {
            return {...state,error:action.error}
        }
        case 'APP/SET_STATUS' : {
            return {...state,status:action.status}
        }
        default:
            return {...state}
    }
}

export type appReducersType = setErrorType | setStatusType
type setErrorType =  ReturnType<typeof setErrorApp>
export const setErrorApp = (error:string | null) => {
    return {
        type : 'APP/SET_ERROR',
        error
    } as const
}
export type setStatusType = ReturnType<typeof setStatusApp>
export const setStatusApp = (status:requestStatusType) => {
    return {
        type : 'APP/SET_STATUS',
        status
    } as const
}