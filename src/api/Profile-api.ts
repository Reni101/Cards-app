import {instance} from "./api";

export type profileEditType = {
    name?: string | null,
    avatar?: any
}

export const profilePageAPI = {
    editProfileName(profileData: profileEditType) {
        return instance.put<ResponseUpdateProfileType>("/auth/me", {
            name: profileData.name,
            avatar: profileData.avatar,
        }).then(res => res.data)
    }
}

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