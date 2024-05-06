import { useQuery } from "react-query";
import { axiosPrivate } from "../api/axiosPublic";

export const getBooks = () => useQuery({
    queryKey: ['get-books'],
    queryFn: async() => await axiosPrivate.get(`/books/:${''}`)
})
