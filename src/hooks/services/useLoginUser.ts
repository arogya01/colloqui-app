import { useMutation } from "@tanstack/react-query"
import { BASE_URL } from "../../config"
import {z} from "zod"; 
import axios from "axios";


const loginUserSchema = z.object({
    email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }),
  });

type LoginData = z.infer<typeof loginUserSchema>;
  

const loginUser = (payloadData:LoginData) => {
    return axios.post(`${BASE_URL}/api/users/login`,payloadData);
}
export const useLoginUser = () => {
    return useMutation({
        mutationFn: loginUser,
    })
}