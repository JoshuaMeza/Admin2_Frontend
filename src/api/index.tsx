import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../http";
import { User } from "../interfaces";

export const useInitSession = () => {
    return useMutation({
        mutationKey: ["Login"],
        mutationFn: async (user: User) => {
            `/test?email=${user.email}&password=${user.password}`;
            const { data } = await httpClient.get<string>('/test');
            return data;
        }
    });
};
