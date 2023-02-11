import {getAuthAC, initialStateType, loginReducer, setLoginAC} from '../pages/login/LoginReducer';
import {LoginType} from '../pages/login/LoginApi';

let initialState: initialStateType;

beforeEach(()=> {
    initialState = {
        id: '',
        name: '',
        token: '',
        isAuth: false,
        email: '',
        password: '',
        rememberMe: false,
    }
})

test('correct work of the login action creator',()=>{
    const loginData:LoginType = {
        rememberMe:true,
        password:'kotpavlik1111',
        email:'kotpavlik88@gmail.com'
    }

    const FinishInitialState = loginReducer(initialState,setLoginAC({data:loginData, id:'kotpavlikId',isAuth: true}))

    expect(FinishInitialState.id).toBe('kotpavlikId')
    expect(FinishInitialState.isAuth).toBe(true)
    expect(FinishInitialState.rememberMe).toBe(true)
    expect(FinishInitialState.password).toBe('kotpavlik1111')
    expect(FinishInitialState.email).toBe('kotpavlik88@gmail.com')
})

test('correct work of the getAuth action creator',()=>{


    const FinishInitialState = loginReducer(initialState,
        getAuthAC({id:'kotpavlikId', name:'Misha', email:'kotpavlik88@gmail.com', isAuth:true, token:'223454356'}))

    expect(FinishInitialState.id).toBe('kotpavlikId')
    expect(FinishInitialState.name).toBe('Misha')
    expect(FinishInitialState.isAuth).toBe(true)
    expect(FinishInitialState.token).toBe('223454356')
    expect(FinishInitialState.email).toBe('kotpavlik88@gmail.com')
})