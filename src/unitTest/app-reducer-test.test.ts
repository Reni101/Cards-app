import {appInitialStateType, appReducer, initializedAppAC, setErrorApp, setStatusApp} from '../redux/App-reducer';

let InitialState: appInitialStateType;

beforeEach(() => {
    InitialState = {
        status: 'idle',
        error: 'error message',
        initialized: true
    }
})

test('correct error message', () => {

    const StateFinish = appReducer(InitialState, setErrorApp({error: 'New error'}))

    expect(StateFinish.error).toBe('New error')
});
test('correct status changing', () => {
    const StateFinishWithStatus = appReducer(InitialState, setStatusApp({status: 'failed'}))

    expect(StateFinishWithStatus.status).toBe('failed')
})
test('checking the correct operation of initialization', () => {
    const StateFinishForCorrectInitialization = appReducer(InitialState, initializedAppAC())

    expect(StateFinishForCorrectInitialization.initialized).toBe(false)
})
