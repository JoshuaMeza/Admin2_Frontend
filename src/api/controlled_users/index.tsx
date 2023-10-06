import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../../helpers";
import { AttendanceRecord, FullEmployee, PaginationData } from "../../interfaces";

export const useGetControlledUser = () => {
	return useMutation({
		mutationKey: ["ControlledUser"],
<<<<<<< HEAD
		mutationFn: async (controlledUser: ControlledUser) => {},
=======
		mutationFn: async (user_id: number) => {
			const { data } = await httpClient.get<FullEmployee>(`/user/${user_id}`);
			return data;
		},
	});
};

interface UserHistoryRequest {
	user_id: number;
	pagination: PaginationData;
}

interface UserHistoryWrapper {
	body: AttendanceRecord[];
}

export const useGetHistoryOfControlledUser = () => {
	return useMutation({
		mutationKey: ["ControlledUser"],
		mutationFn: async ({ user_id, pagination }: UserHistoryRequest) => {
			const { data } = await httpClient.get<UserHistoryWrapper>(
				`/user/${user_id}/attendance_history?limit=${pagination.perPage}`
			);
			return data.body;
		},
>>>>>>> development
	});
};
