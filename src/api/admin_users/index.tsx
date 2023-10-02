import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../../helpers";
import { ControlledUser, Schedule } from "../../interfaces";

interface ControlledUsersResponse {
	controlled_users: ControlledUser[];
}

export const useGetAllEmployees = () => {
	return useMutation({
		mutationKey: ["Employees"],
		mutationFn: async () => {
			const { data } = await httpClient.get<ControlledUsersResponse>("/user/");
			return data.controlled_users;
		},
	});
};

export const useGetSchedulesOfEmployee = () => {
	return useMutation({
		mutationKey: ["Employees"],
		mutationFn: async (employee_id: number) => {
			const { data } = await httpClient.get<Schedule[]>(`/user/${employee_id}/schedules`);
			return data;
		},
	});
};
