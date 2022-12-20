import {appInitialStateType, AppReducer, initializedAppAC, setErrorApp, setStatusApp} from './AppReducer';

let InitialState: appInitialStateType;

beforeEach(()=>{
    InitialState = {
        status:'idle',
        error:'error message',
        initialized:true
    }
})

test('correct error message', () => {

 const StateFinish = AppReducer(InitialState,setErrorApp({error:'New error'}))

    expect(StateFinish.error).toBe('New error')
});
test('correct status changing', () => {
    const StateFinishWithStatus = AppReducer(InitialState,setStatusApp({status:'failed'}))

    expect(StateFinishWithStatus.status).toBe('failed')
})
test('checking the correct operation of initialization', () => {
    const StateFinishForCorrectInitialization = AppReducer(InitialState,initializedAppAC())

    expect(StateFinishForCorrectInitialization.initialized).toBe(false)
})
