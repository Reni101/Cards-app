import {instance} from "./api";

export type ForgotResponseType = {
    "info": string
    "success": boolean
    "answer": boolean
    "html": boolean
}

export const RecoveryApi = {
    recoveryForgotPassword(email: string) {
        const payload = {
            email,
            from: "test-front-admin <Renigano@gmail.com>",
            message: `<div>
                      password recovery link: 
                      <a href='https://neko-back.herokuapp.com/2.0/#/set-new-password/$token$'>
                      link</a></div>`,
        }

        return instance.post<ForgotResponseType>("/auth/forgot", payload)
    },
    setNewPassword(password: string, token: string) {
        return instance.post("/auth/set-new-password", {
            password,
            resetPasswordToken: token
        })
    },

}


