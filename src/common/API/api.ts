import axios from "axios";

//process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' :
export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL,
    withCredentials: true,
})

