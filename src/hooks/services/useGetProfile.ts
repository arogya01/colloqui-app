import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { BASE_URL } from "../../config";
import { useSession } from "../useSession";



const fetchProfile = async (session?:string | null | undefined) => {
    const response = await axios.get(`${BASE_URL}/api/users/profile`, {
        headers: {
            Authorization: `Bearer ${session}`
        }
    });
    const data = response.data;
    return data;
}


export const useGetProfile = () => {
    const { session } = useSession();
    return useQuery({
        queryKey:["profile"], 
        queryFn: () => fetchProfile(session), 
        enabled: !!session,
        staleTime: 1000 * 60 * 60 * 24, 
        refetchOnWindowFocus: true     
    })
}