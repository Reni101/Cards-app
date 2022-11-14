import axios from "axios";


export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})
// Типизация респонса, после обновления имени/аватара
export type ResponseUpdateProfileType = {
    updatedUser: updatedUser;
    token: string;
    tokenDeathTime: number;
}
export type updatedUser = {
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
    avatar?: string;
}
// Типизация респонса, после обновления имени/аватара