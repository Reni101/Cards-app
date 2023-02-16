import {instance} from "./api";

export const loginApi = {
    login(data: LoginType) {
        return instance.post<ResponseDataLoginType>('/auth/login', data)
            .then(res => res.data)
    },
    authUser() {
        return instance.post<ResponseDataLoginType>('/auth/me', {})
            .then(res => res.data)
    },
    logout() {
        return instance.delete('/auth/me', {})
            .then(res => res.data)
    }
}

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}

export type ResponseDataLoginType = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
    token: string;
    tokenDeathTime: number;
    avatar: string;
}