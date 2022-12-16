import {getAuthAC, initialStateType, LoginReducer, setLoginAC} from './LoginReducer';
import {LoginType} from '../loginAPI/LoginApi';

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

    const FinishInitialState = LoginReducer(initialState,setLoginAC(loginData,'kotpavlikId',true))

    expect(FinishInitialState.id).toBe('kotpavlikId')
    expect(FinishInitialState.isAuth).toBe(true)
    expect(FinishInitialState.rememberMe).toBe(true)
    expect(FinishInitialState.password).toBe('kotpavlik1111')
    expect(FinishInitialState.email).toBe('kotpavlik88@gmail.com')
})

test('correct work of the getAuth action creator',()=>{


    const FinishInitialState = LoginReducer(initialState,
        getAuthAC('kotpavlikId','Misha','kotpavlik88@gmail.com',true,'223454356'))

    expect(FinishInitialState.id).toBe('kotpavlikId')
    expect(FinishInitialState.name).toBe('Misha')
    expect(FinishInitialState.isAuth).toBe(true)
    expect(FinishInitialState.token).toBe('223454356')
    expect(FinishInitialState.email).toBe('kotpavlik88@gmail.com')
})