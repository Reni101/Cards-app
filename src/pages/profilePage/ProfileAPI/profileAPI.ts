import {instance, ResponseUpdateProfileType} from "../../../common/API/api";

//process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' :


export const profilePageAPI = {
    editProfileName(name: string) {
        return instance.put<ResponseUpdateProfileType>("/auth/me", {name})
    }
}




