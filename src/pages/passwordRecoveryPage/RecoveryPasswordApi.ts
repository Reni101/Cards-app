
import axios from "axios";


export const RecoveryPasswordApi = {

    recoveryForgotPassword(email: string) {
        const payload = {
            email,
            from: "test-front-admin <Renigano@gmail.com>",
            message: `<div>
                      password recovery link: 
                      <a href='http://localhost:3000/#/new-password/$token$'>
                      link</a></div>`,
        }

        return axios.post("https://neko-back.herokuapp.com/2.0/auth/forgot", payload
            , {
                withCredentials: true
            })
    },
    setNewPassword(password: string, token: string) {


        return axios.post("https://neko-back.herokuapp.com/2.0/auth/set-new-password", {password,
            resetPasswordToken: token}
            , {
                withCredentials: true
            })
    },

}