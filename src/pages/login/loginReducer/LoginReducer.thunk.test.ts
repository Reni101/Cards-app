import {getAuthTC} from './LoginReducer';
import {loginApi, ResponseDataLoginType} from '../loginAPI/LoginApi';

jest.mock('../loginAPI/LoginApi')
const loginApiMock = loginApi as jest.Mocked<typeof loginApi>;

const result: ResponseDataLoginType = {
    _id: 'userId_1',
    name: 'User 1',
    email: 'usergmail@gmail.com',
    __v: 0,
    avatar: 'no_avatar',
    token: '123456789987654321',
    created: '01.01.2022',
    isAdmin: false,
    publicCardPacksCount: 9,
    rememberMe: true,
    tokenDeathTime: 1670426179906,
    updated: '01.01.2023',
    verified: false
}

// I repaired this test <3
test('auth thunk work correct', async () => {
    loginApiMock.authUser.mockReturnValue(Promise.resolve(result))
    const thunk = getAuthTC()
    const dispatchMock = jest.fn()

    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(2)
})