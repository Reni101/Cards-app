import {AppThunk} from "../../../Redux/Store";


const initialState = {
    profileName: ""
}

type InitialStateType = typeof initialState

export const ProfilePage = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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

export const editProfileNameTC = (): AppThunk => async dispatch => {

}


//

export type ActionsType =
    | ReturnType<typeof AC>

