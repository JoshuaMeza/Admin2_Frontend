import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../../helpers";
import { ControlledUser, Pagination, Schedule } from "../../interfaces";

interface ControlledUsersResponse {
	controlled_users: ControlledUser[];
}

export const useGetAllEmployees = () => {
	return useMutation({
		mutationKey: ["Employees"],
		mutationFn: async ({ page, perPage }: Pagination) => {
			const { data } = await httpClient.get<ControlledUsersResponse>(
				`/user/?page=${page}&per_page=${perPage}`
			);
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

export const useDeactivateEmployee = () => {
	return useMutation({
		mutationKey: ["Employees"],
		mutationFn: async (employee_id: number) => {
			const { data } = await httpClient.delete<string>(`/user/${employee_id}`);
			return data;
		},
	});
};
