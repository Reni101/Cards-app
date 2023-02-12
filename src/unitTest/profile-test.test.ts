import {
    editProfileNameAvatarAC,
    profilePageReducer, sliceProfileType
} from "../redux/Profile-reducer";


let startState: sliceProfileType

beforeEach(() => {
    startState = {
        user_id: "",
        email: "",
        name: "",
        publicCardPacksCount: 0,
        avatar: "",
    }
})

test('correct edit profile name', () => {
    const endState = profilePageReducer(startState, editProfileNameAvatarAC({name: "Maxim1", avatar: null}))

    expect(endState.name).toBe("Maxim1")
    expect(endState.avatar).toBe(null)
})
test('correct edit profile avatar', () => {
    const endState = profilePageReducer(startState, editProfileNameAvatarAC({name: "", avatar: "new avatar"}))

    expect(endState.name).toBe("")
    expect(endState.avatar).toBe("new avatar")
})

