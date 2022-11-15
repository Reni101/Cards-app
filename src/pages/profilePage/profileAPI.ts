import {instance} from "../../common/API/api";


export const profilePageAPI = {
    editProfileName(name: string | null) {
        return instance.put<ResponseUpdateProfileType>("/auth/me", {name})
    }
}


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
    avatar: string;
}