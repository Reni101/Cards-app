import {
    editProfileNameAvatarAC,
    InitialProfileStateType,
    ProfilePageReducer
} from "../pages/profilePage/ProfilePagerReducer";


let startState:InitialProfileStateType


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
    const endState = ProfilePageReducer(startState, editProfileNameAvatarAC("Maxim1", null))

    expect(endState.name).toBe("Maxim1")
    expect(endState.avatar).toBe(null)
})
test('correct edit profile avatar', () => {
    const endState = ProfilePageReducer(startState, editProfileNameAvatarAC("", "new avatar"))

    expect(endState.name).toBe("")
    expect(endState.avatar).toBe("new avatar")
})

