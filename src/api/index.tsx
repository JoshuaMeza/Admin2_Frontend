import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../http";
import { User } from "../interfaces";

export const useInitSession = () => {
    return useMutation({
        mutationKey: ["Login"],
        mutationFn: async (user: User) => {
            const url = `http://localhost:8080/login/login?email=${user.email}&password=${user.password}`;
            try{
                const { data } = await httpClient.post<string>(url);
                return data;
            } catch (error) {
                throw error;
            }
        }
    });
};
