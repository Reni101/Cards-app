import {
    sliceRecoveryType,
    recoveryPasswordReducer,
    setRecoverEmailAC
} from "../pages/passwordRecoveryPage/RecoveryPasswordReducer";


let startState:sliceRecoveryType = {
    email: "",
    isRedirectToLogin: false
};


beforeEach(() => {
    startState = {
        email: "",
        isRedirectToLogin: false,
    }
})

test('correct set email ', () => {
    const endState = recoveryPasswordReducer(startState, setRecoverEmailAC({email:"maximor-2008@tut.by"}))

    expect(endState.email).toBe("maximor-2008@tut.by")
    expect(endState.isRedirectToLogin).toBe(false)
})

