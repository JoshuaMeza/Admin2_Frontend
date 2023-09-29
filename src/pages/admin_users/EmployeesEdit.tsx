import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const AdminUsersEmployeesEdit = () => {
	const location = useLocation();

	useEffect(() => {
		console.log(location.state);
	}, []);

	return <></>;
};
