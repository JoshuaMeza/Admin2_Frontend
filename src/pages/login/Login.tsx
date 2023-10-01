import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useInitSession } from "../../api";
import { User } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { destroySession, setSession } from "../../helpers";
import {
	Alert,
	Box,
	Container,
	InputLabel,
	FormControl,
	Input,
	InputAdornment,
	IconButton,
	Button,
	ButtonProps,
	AlertColor,
} from "@mui/material";

	const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
		color: theme.palette.getContrastText("#CB8B2A"),
		backgroundColor: "#CB8B2A",
		"&:hover": {
			backgroundColor: "#C7882A",
		},
	}));

interface AlertData {
	show: boolean;
	type: AlertColor;
	message: string;
}

export const Login = () => {
	const navigate = useNavigate();
	const initSession = useInitSession();
	const [showPassword, setShowPassword] = useState(false);
	const [showMessage, setShowMessage] = useState<AlertData>({
		show: false,
		type: "info",
		message: "",
	});
	const [user, setUser] = useState<User>({
		email: "",
		password: "",
	});

	destroySession();

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	const requestInitSession = () => {
		initSession.mutate(user, {
			onSuccess: (data) => {
				if (data.status) {
					setSession(data.user);

					if (data.user.userType == "controlled") {
						navigate("/users/schedule");
					} else {
						navigate("/admin/jobs");
					}
				} else {
					setShowMessage({
						show: true,
						type: "warning",
						message: "Los datos proporcionados no son correctos",
					});
				}
			},
			onError: () => {
				setShowMessage({
					show: true,
					type: "error",
					message: "Ocurrió un error al intentar iniciar sesión",
				});
			},
		});
	};

	return (
		<>
			<Container
				maxWidth="md"
				sx={{
					minHeight: "80vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Box
					sx={{ minWidth: "70%", bgcolor: "#F0EFEF", padding: "4rem 1.5rem" }}
				>
					<div>
						<h2>Bienvenido al sistema AMS</h2>
					</div>

					<Box
						component="form"
						sx={{
							"& .MuiTextField-root": { m: 3, width: "25ch" },
						}}
						noValidate
						autoComplete="off"
					>
						{showMessage.show ? (
							<Alert severity={showMessage.type}>{showMessage.message}</Alert>
						) : null}

						<div className="div-input-form">
							<FormControl sx={{ m: 4, width: "90%" }} variant="standard">
								<InputLabel htmlFor="standard-adornment-correo">
									Correo
								</InputLabel>
								<Input
									id="standard-adornment-amount"
									onChange={(e) => setUser({ ...user, email: e.target.value })}
								/>
							</FormControl>
						</div>
						<div className="div-input-form">
							<FormControl sx={{ m: 4, width: "90%" }} variant="standard">
								<InputLabel htmlFor="standard-adornment-password">
									Contraseña
								</InputLabel>
								<Input
									id="filled-adornment-password"
									type={showPassword ? "text" : "password"}
									onChange={(e) =>
										setUser({ ...user, password: e.target.value })
									}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</div>
					</Box>

					<div className="div-button">
						<ColorButton variant="contained" onClick={requestInitSession}>
							Iniciar Sesión
						</ColorButton>
					</div>
				</Box>
			</Container>
		</>
	);
};
