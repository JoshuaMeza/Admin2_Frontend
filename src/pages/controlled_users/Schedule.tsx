import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/material";
import { useGetControlledUser, useGetSchedulesOfEmployee } from "../../api";
import { Schedule, SessionUser } from "../../interfaces";
import { useEffect, useState } from "react";
import { getSession } from "../../helpers";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#CB8B2A",
		color: theme.palette.common.black,
		fontSize: 16,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 12,
		fontweigth: "bold",
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

interface Column {
	id: "entry" | "exit";
	label: string;
	minWidth?: number;
	align?: "center";
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: "entry", label: "Entrada", minWidth: 300 },
	{ id: "exit", label: "Salida", minWidth: 300 },
];

function getFirstName(fullName: string) {
	const words = fullName.split(" ");
	if (words.length > 0) {
		return words[0];
	} else {
		return "";
	}
}

export const ControlledUsersSchedule = () => {
	const getSchedules = useGetSchedulesOfEmployee();
	const getUser = useGetControlledUser();
	const [rows, setRows] = useState<Schedule[]>([]);
	const [name, setName] = useState<string>("");

	useEffect(() => {
		requestSchedules();
		requestUserInfo();
	}, []);

	const requestUserInfo = () => {
		const sessionUser: SessionUser = getSession();
		getUser.mutate(sessionUser.id, {
			onSuccess: (data) => {
				const firstName = getFirstName(data.name);
				setName(firstName);
			},
			onError: () => {
				console.log("Error al cargar datos del usuario");
			},
		});
	};

	const requestSchedules = () => {
		const sessionUser: SessionUser = getSession();
		getSchedules.mutate(sessionUser.id, {
			onSuccess: (data) => {
				setRows(data);
			},
			onError: () => {
				console.log("Error al cargar los horarios");
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
					alignItems: "start",
					justifyContent: "center",
				}}
			>
				<Box sx={{ minWidth: "70%", bgcolor: "#F0EFEF", padding: "2.5rem 1.5rem" }}>
					<h2 style={{ marginTop: "0" }}>¡Hola de nuevo {name}!</h2>
					<p>Tu horario es:</p>
					<Paper sx={{ width: "100%", overflow: "hidden" }}>
						<TableContainer sx={{ maxHeight: 440 }}>
							<Table stickyHeader aria-label="sticky table">
								<TableHead>
									<TableRow>
										{columns.map((column) => (
											<StyledTableCell
												key={column.id}
												align="center"
												style={{ minWidth: column.minWidth }}
											>
												{column.label}
											</StyledTableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{rows && rows.length > 0 ? (
										rows.map((row) => (
											<StyledTableRow
												key={row.entryDay.name}
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
													"&:nth-of-type(odd) .MuiTableCell-body": {
														color: "#CB8B2A",
													},
												}}
											>
												<StyledTableCell component="th" scope="row" align="center">
													{row.entryDay.name} {row.entryTime}
												</StyledTableCell>
												<StyledTableCell align="center">
													{row.exitDay.name} {row.exitTime}
												</StyledTableCell>
											</StyledTableRow>
										))
									) : (
										<StyledTableRow
											key={0}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
												"&:nth-of-type(odd) .MuiTableCell-body": {
													color: "#CB8B2A",
												},
											}}
										>
											<StyledTableCell scope="row" align="center" colSpan={5}>
												No hay horarios asignados
											</StyledTableCell>
										</StyledTableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</Box>
			</Container>
		</>
	);
};
