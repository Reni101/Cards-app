import axios  from "axios";


export const instance = axios.create({
    baseURL:  'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})
//process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' :
export type ResponseType = {
    updatedUser: updatedUserResponse;
    token: string;
    tokenDeathTime: number;
}
export type updatedUserResponse = {
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
    avatar?: any;
}

export const profilePageAPI = {
    editProfileName(newName: string, newAvatar: string = "") {//потом исправить
        return instance.put<ResponseType>("/auth/me", {name: newName, avatar: newAvatar})
    }
}




