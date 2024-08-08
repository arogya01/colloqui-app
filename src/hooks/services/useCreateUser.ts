import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
import { z } from 'zod';
import { BASE_URL } from "../../config";


const signupSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string({
      required_error: "Password is required",
    }).min(8, "Password must be at least 8 characters long"),
    userName: z.string({
      required_error: "Name is required",
    }),
    bio: z.string().optional(),
    phoneNumber: z.string().min(10, "Phone number must be 10 digits").max(10, "Phone number must be 10 digits"),
    image: z.string().optional(),
  });
  
type SignupData = z.infer<typeof signupSchema>; 

const createUser = async (userData: SignupData) => {
    const resp = await axios.post(`${BASE_URL}/api/users/signup`, userData); 
    console.log('running axios');
    console.log(resp);
    return resp.data; 
}
export const useCreateUser = () => {
    return useMutation<any, Error, SignupData>({
     mutationFn:  createUser
    })
}