import { useEffect } from "react";
import { Container, CssBaseline } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./components";
import { destroySession, getSession, hasActiveSession } from "./helpers";
import { SessionUser } from "./interfaces";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export function Layout() {
	const location = useLocation();
	const navigate = useNavigate();
	const invalidAccessValidators = [
		(pathname: string, session: SessionUser) => {
			return pathname.includes("/admin/") && session.userType == "controlled";
		},
		(pathname: string, session: SessionUser) => {
			return pathname.includes("/users/") && session.userType == "administrative";
		},
	];

	const validateAccessRights = function () {
		if (location.pathname == "/") {
			destroySession();
		} else {
			if (hasActiveSession()) {
				const pathname = location.pathname;
				const session = getSession();

				if (invalidAccessValidators.some((validator) => validator(pathname, session))) {
					navigate("/");
				}
			} else {
				navigate("/");
			}
		}
	};

	useEffect(() => {
		validateAccessRights();
	});

	return (
		<div>
			<CssBaseline />
			<Navbar />

			<main>
				<Container style={{ minHeight: "100vh", paddingTop: "1.5rem" }}>
					<Outlet />
				</Container>
			</main>
		</div>
	);
}
