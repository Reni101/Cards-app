import {
    sliceRecoveryType,
    recoveryReducer,
    setRecoverEmailAC
} from "../redux/Recovery-reducer";


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
    const endState = recoveryReducer(startState, setRecoverEmailAC({email:"maximor-2008@tut.by"}))

    expect(endState.email).toBe("maximor-2008@tut.by")
    expect(endState.isRedirectToLogin).toBe(false)
})

