import { Button, AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

interface PageOptions {
	[key: string]: PageOption[];
}

interface PageOption {
	label: string;
	link: string;
	active: boolean;
}

export const Navbar = () => {
	const SCHEDULE = { label: "Mi horario", link: "/users/schedule" };
	const HISTORY = { label: "Mi historial", link: "/users/history" };
	const CLOSURE = { label: "Cerrar Sesión", link: "/" };

	const location = useLocation();
	const page_options: PageOptions = {
		"/": [],
		"/users/schedule": [
			{ ...SCHEDULE, active: true },
			{ ...HISTORY, active: false },
			{ ...CLOSURE, active: false},
		],
		"/users/history": [
			{ ...SCHEDULE, active: false },
			{ ...HISTORY, active: true },
			{ ...CLOSURE, active: false},
		],
	};

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar
				position="static"
				style={{ backgroundColor: "#DC7A20", padding: "0.3rem 0.5rem" }}
			>
				<Toolbar variant="dense">
					<Typography
						variant="h4"
						color="black"
						component="div"
						sx={{ flexGrow: 1, fontWeight: "bold", fontStyle: "italic" }}
					>
						AMS
					</Typography>
					<Box>
						{page_options[location.pathname].map((option, index) => (
							<Link to={option.link} key={index}>
								<Button
									sx={{ color: "#fff" }}
									variant={option.active ? "contained" : "text"}
								>
									{option.label}
								</Button>
							</Link>
						))}
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
