import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { Layout } from "./Layout.tsx";
import { Login, ControlledUsersSchedule, ControlledUsersHistory } from "./pages";


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
			}
		],
	},
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>,
);
