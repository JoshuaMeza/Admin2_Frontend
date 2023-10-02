import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../../helpers";
import { EditableJob, Job } from "../../interfaces";

const url = "http://localhost:8080"
export const useGetJobs = () => {
    return useMutation({
        mutationKey: ["Jobs"],
        mutationFn: async (jobs: []) => {
            const { data } = await httpClient.get<[Job]>(
                url+"/jobs/"
            );
            return data;
        },
    });
}

export const useCreateJob = () => {
    return useMutation({
        mutationKey: ["Jobs"],
        mutationFn: async (job: Job) => {
            const { data } = await httpClient.post<Job>(
                url+"/jobs/",
                {
                    ...job,
                }
            );
            return data;
        }
    });
};

export const useUpdateJob = () => {
    return useMutation({
        mutationKey: ["Jobs"],
        mutationFn: async (job: EditableJob) => {
            const { data } = await httpClient.put<EditableJob>(
                url+"/jobs/"+job.id,
                {
                    ...job,
                }
            );
            return data;
        }
    })
}

export const useDeleteJob = () => {
    return useMutation({
        mutationKey: ["Jobs"],
        mutationFn: async (job: EditableJob) => {
            const { data } = await httpClient.delete<EditableJob>(
                url+"/jobs/"+job.id
            );
        }
    })
}