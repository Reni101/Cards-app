import {getAuthTC} from './LoginReducer';
import {loginApi, ResponseDataLoginType} from '../loginAPI/LoginApi';

jest.mock('../loginAPI/LoginApi')
const loginApiMock = loginApi;

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

// @ts-ignore
loginApiMock.authUser.mockReturnValue(Promise.resolve(result))


// this is bad test for thunk, need more info about jest testing for thunks.
// Please don't use this test as example !
test('', async () => {
    const thunk = getAuthTC()
    const dispatchMock = jest.fn()
    //@ts-ignore
    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(1)
})