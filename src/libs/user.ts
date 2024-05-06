import { useMutation, useQuery } from "react-query";
import { axiosPublic } from "../api/axiosPublic";
import { TLoginCreateUser } from "../types/user";

export const getUser = async() => useQuery({
    queryKey: ['get-user'],
    queryFn: async() => {
        // const res = await
    }
})


export const createLoginUser = () => useMutation((data: TLoginCreateUser) => axiosPublic.post(`/signup`, data))