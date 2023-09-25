import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useInitSession } from "../api";
import { User } from "../interfaces";
import { useNavigate } from 'react-router-dom';



const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: theme.palette.getContrastText("#CB8B2A"),
	backgroundColor: "#CB8B2A",
	"&:hover": {
		backgroundColor: "#C7882A",
	},
}));

export const Login = () => {
	const initSession = useInitSession();
	const [showPassword, setShowPassword] = useState(false);
	const [user, setUser] = useState<User>({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	const requestInitSession = () => {
		console.log(user);

		initSession.mutate(user, {
			onSuccess: (received) => {
				console.log(received);
				if(received.status != false){
					if(received.user.userType == "controlled"){
						navigate("/users/schedule");
					}
				}
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
