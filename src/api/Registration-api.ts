import {AxiosResponse} from "axios";
import {instance} from "./api";


export const registrationApi = {
    registration(data: { email: string, password: string }) {
        return instance.post<{ email: string, password: string }, AxiosResponse>('auth/register', data)
            .then(res => res.data)
    }
}
