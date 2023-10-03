import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../../helpers";
import { Job } from "../../interfaces";

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
    },
  });
};
