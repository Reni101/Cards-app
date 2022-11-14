import {instance} from '../../profilePage/ProfileAPI/profileAPI';


export type LoginType = {
    email:string
    password:string
    rememberMe:boolean
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


export const loginApi = {
    login(data:LoginType) {
        return instance.post<ResponseDataLoginType>('/auth/login', data).then(response => {
            return response
        })
    },
    logout() {
        return instance.delete('/auth/login').then(response => {
            return response
        })
    }
}