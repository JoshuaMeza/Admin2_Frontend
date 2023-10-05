import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../../helpers";
import { ListedEmployee, PaginationData, Schedule, Job } from "../../interfaces";

interface EmployeesWrapper {
	controlled_users: ListedEmployee[];
}

export const useGetJobs = () => {
	return useMutation({
		mutationKey: ["Jobs"],
		mutationFn: async () => {
			const { data } = await httpClient.get<Job[]>("/jobs/");
			return data;
		},
	});
};

export const useCreateJob = () => {
	return useMutation({
		mutationKey: ["Jobs"],
		mutationFn: async (job: Job) => {
			const { data } = await httpClient.post<Job>("/jobs/", {
				...job,
			});
			return data;
		},
	});
};

export const useUpdateJob = () => {
	return useMutation({
		mutationKey: ["Jobs"],
		mutationFn: async (job: Job) => {
			const { data } = await httpClient.put<Job>("/jobs/" + job.id, {
				...job,
			});
			return data;
		},
	});
};

export const useDeleteJob = () => {
	return useMutation({
		mutationKey: ["Jobs"],
		mutationFn: async (job: Job) => {
			const { data } = await httpClient.delete<Job>("/jobs/" + job.id);
			return data;
		},
	});
};

export const useGetAllEmployees = () => {
	return useMutation({
		mutationKey: ["Employees"],
		mutationFn: async ({ page, perPage }: PaginationData) => {
			const { data } = await httpClient.get<EmployeesWrapper>(
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

interface InoutRecord {
	employee_id: number;
	arriving: boolean;
	dateTimeRecord: string;
}

export const useRegisterInout = () => {
	return useMutation({
		mutationKey: ["Employees"],
		mutationFn: async ({ employee_id, arriving, dateTimeRecord }: InoutRecord) => {
			const { data } = await httpClient.post<unknown>(`/user/user/${employee_id}/register_inout`, {
				arriving,
				dateTimeRecord,
			});
			return data;
		},
	});
};
