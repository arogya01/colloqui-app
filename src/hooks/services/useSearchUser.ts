import { useQuery } from "@tanstack/react-query"
import { BASE_URL } from "../../config"
import axios from "axios";



interface UserProfile {
    userName: string;
    email: string;
    phoneNumber: string;
    bio: string;
    image: string;
  }
  
  interface UserData {
    id: number;
    Profile: UserProfile;
  }

interface User extends UserProfile {
    id: number; 
}

const fetchUsers = ({userName}:{userName:string}) => {
    const endpoint = `${BASE_URL}/api/users/search?username=${userName}`; 
    return axios.get(endpoint);
}

const transformUserData = (data:UserData[]): User[] => {
    return data.map(item => ({
        id: item.id,
        ...item.Profile
      }));
}
export const useSearchUser = ({userName}:{userName: string}) => {
    
    return useQuery({
        enabled:!!userName,
       queryKey: ['searchUser',userName], 
       queryFn: () => fetchUsers({userName}), 
       select: (response) => transformUserData(response.data)
    })
}