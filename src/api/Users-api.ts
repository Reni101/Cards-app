import {instance} from "./api";

export const usersApi = {
    getUsers(params?: queryUsersParamsType) {
        return instance.get<ResponseUsersType>('/social/users', {params}).then(res => res.data)
    }
}

export type ResponseUsersType = {
    users: User[]
    page: number
    pageCount: number
    usersTotalCount: number
    minPublicCardPacksCount: number
    maxPublicCardPacksCount: number
}

export type User = {
    avatar?: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    updated: string
    verified: boolean
    _id: string
}

export type  queryUsersParamsType = {
    userName: string | null
    min: number | null
    max: number | null
    sortUsers: string | null
    page: number | null
    pageCount: number | null
}