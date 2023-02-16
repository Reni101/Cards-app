import {instance} from "./api";

export const RecoveryApi = {
    recoveryForgotPassword(email: string) {
        const payload = {
            email,
            from: "test-front-admin <Renigano@gmail.com>",
            message: `<div>
                      password recovery link: 
                      <a href='https://reni101.github.io/Cards-app/#/set-new-password/$token$'>
                      link</a></div>`,
        }

        return instance.post<ForgotResponseType>("/auth/forgot", payload).then(res => res.data)
    },
    setNewPassword(password: string, token: string) {
        return instance.post("/auth/set-new-password", {
            password,
            resetPasswordToken: token
        }).then(res => res.data)
    },

}

export type ForgotResponseType = {
    "info": string
    "success": boolean
    "answer": boolean
    "html": boolean
}

