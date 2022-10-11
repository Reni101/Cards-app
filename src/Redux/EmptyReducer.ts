import {AppThunk} from "./Store";

const initialState = {}

type InitialStateType = typeof initialState

export const Reducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ' ':
            return state
        default:
            return state
    }
}
//=============================AC======================================
export const AC = () => ({
    type: ' ',

} as const)


//==============================TC============================

export const TC = (): AppThunk => async dispatch => {

}


//

export type ActionsType =
    | ReturnType<typeof AC>

