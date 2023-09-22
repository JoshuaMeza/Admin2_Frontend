import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../http";
import { ControlledUser, Day, Schedule } from "../interfaces/ControlledUser";

export const useGetControlledUser = () => {
    return useMutation({
        mutationKey: ["ControlledUser"],
        mutationFn: async (controlledUser: ControlledUser) => {
            
        }
    })
}