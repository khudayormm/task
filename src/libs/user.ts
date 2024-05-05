import { useMutation, useQuery } from "react-query";
import { axiosPublic } from "../api/axiosPublic";
import { TLoginCreateUser } from "../types/user";

export const getUser = async() => useQuery({
    queryKey: ['get-user'],
    queryFn: async() => {
        // const res = await
    }
})

const headers = {
    'Key': `{}`, 
    'Sign': '{Sign}', // Replace {Sign} with the actual sign value
    'Content-Type': 'application/json',
};

export const createLoginUser = () => useMutation((data: TLoginCreateUser) => axiosPublic.post(`/signup/`, data, {
    headers: {
        'Key': `${import.meta.env.VITE_APP_APP_KEY}`,
        'Sign': `${import.meta.env.VITE_APP_SIGN}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
}))