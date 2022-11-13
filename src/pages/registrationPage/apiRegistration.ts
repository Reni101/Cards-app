import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})

export const registrationApi = {
    registration(data: { email: string, password: string }) {
        return instance.post<{ email: string, password: string }, AxiosResponse<{ addedUser: ResponseRegistrationType }>>('auth/register', data)
    }
}

type ResponseRegistrationType = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean
    __v: number
    _id: string
}