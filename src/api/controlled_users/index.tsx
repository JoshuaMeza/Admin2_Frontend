import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../../helpers";
import { ControlledUser, Day, Schedule } from "../../interfaces";

export const useGetControlledUser = () => {
  return useMutation({
    mutationKey: ["ControlledUser"],
    mutationFn: async (controlledUser: ControlledUser) => {},
  });
};
