import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { Layout } from "./Layout.tsx";
import {
	Login,
	ControlledUsersSchedule,
	ControlledUsersHistory,
	AdminUsersJobs,
	AdminUsersEmployees,
	AdminUsersEmployeesNew,
	AdminUsersEmployeesEdit,
} from "./pages";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "",
				element: <Login />,
			},
			{
				path: "/users/schedule",
				element: <ControlledUsersSchedule />,
			},
			{
				path: "/users/history",
				element: <ControlledUsersHistory />,
			},
			{
				path: "/admin/jobs",
				element: <AdminUsersJobs />,
			},
			{
				path: "/admin/employees",
				element: <AdminUsersEmployees />,
			},
			{
				path: "/admin/employees/new",
				element: <AdminUsersEmployeesNew />,
			},
			{
				path: "/admin/employees/edit",
				element: <AdminUsersEmployeesEdit />,
			},
		],
	},
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
);
