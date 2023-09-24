import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export function Layout() {
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
