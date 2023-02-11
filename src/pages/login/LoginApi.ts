import {instance} from "../../common/API/api";


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
    authUser() {
        return instance.post<ResponseDataLoginType>('/auth/me', {}).then(response => {
                return response.data
            //this nid to test thunk
    })
    },
    logout() {
        return instance.delete('/auth/me',{}).then(response => {
            return response
        })
    }
}
