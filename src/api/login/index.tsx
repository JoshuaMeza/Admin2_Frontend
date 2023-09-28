import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../../helpers";
import { SessionUser, User } from "../../interfaces";

interface SessionUserResponse {
	user: SessionUser;
	status: boolean;
}

export const useInitSession = () => {
	return useMutation({
		mutationKey: ["Login"],
		mutationFn: async (user: User) => {
			const { data } = await httpClient.post<SessionUserResponse>(
				"/login/",
				{
					...user,
				}
			);
			return data;
		},
	});
};
