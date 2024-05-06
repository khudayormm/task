import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
        'key': `${localStorage.getItem('key')}`,
        'secret': `${localStorage.getItem('secret')}`,
        'sign': ''
    }
})
