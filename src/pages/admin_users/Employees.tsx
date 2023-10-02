import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
	Box,
	Button,
	ButtonProps,
	Container,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	styled,
	tableCellClasses,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllEmployees, useGetSchedulesOfEmployee } from "../../api";
import { ControlledUser, Schedule } from "../../interfaces";
import { DayRemoteId } from "../../constants";
import dayjs from "dayjs";

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
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

const ColorButton = styled(Button)<ButtonProps>(() => ({
	color: "black",
	backgroundColor: "#CB8B2A",
	"&:hover": {
		backgroundColor: "#C7882A",
	},
}));

interface Column {
	id: string;
	label: string;
	minWidth: number;
}

export const AdminUsersEmployees = () => {
	const navigate = useNavigate();
	const getAllEmployees = useGetAllEmployees();
	const getSchedulesOfEmployee = useGetSchedulesOfEmployee();
	const [employees, setEmployees] = useState<ControlledUser[]>([]);

	const columns: Column[] = [
		{ id: "name", label: "Nombre", minWidth: 120 },
		{ id: "job", label: "Puesto", minWidth: 120 },
		{ id: "schedules", label: "Horario", minWidth: 120 },
		{ id: "presence", label: "Presencia", minWidth: 120 },
		{ id: "operations", label: "Operaciones", minWidth: 120 },
	];

	const days: { [key: number]: number } = {
		0: DayRemoteId.Sunday,
		1: DayRemoteId.Monday,
		2: DayRemoteId.Tuesday,
		3: DayRemoteId.Wednesday,
		4: DayRemoteId.Thursday,
		5: DayRemoteId.Friday,
		6: DayRemoteId.Saturday,
	};

	useEffect(() => {
		loadEmployees();
	}, []);

	const loadEmployees = () => {
		getAllEmployees.mutate(undefined, {
			onSuccess(data) {
				data.forEach((employee) => {
					loadSchedulesOfEmployee(employee);
				});
				setEmployees(data);
			},
		});
	};

	const loadSchedulesOfEmployee = (employee: ControlledUser) => {
		getSchedulesOfEmployee.mutate(employee.id, {
			onSuccess(data) {
				employee.schedules = data;
			},
			onError() {
				employee.schedules = [];
			},
		});
	};

	const isToday = (schedule: Schedule) => {
		return days[dayjs().day()] == schedule.entryDay.id;
	};

	const handleNewEmployee = () => {
		navigate("/admin/employees/new");
	};

	const hanldeEditEmployee = (id: number) => {
		navigate("/admin/employees/edit", { state: { employee_id: id } });
	};

	const hanldeRemoveEmployee = (id: number) => {
		console.log(id);
	};

	const hanldeShowSchedulesOfEmployee = (id: number) => {
		console.log(id);
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
					<h2 style={{ marginTop: "0" }}>Tabla de empleados</h2>

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
									{employees && employees.length > 0 ? (
										employees.map((employee) => (
											<StyledTableRow
												key={employee.id}
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
													"&:nth-of-type(odd) .MuiTableCell-body": {
														color: "#CB8B2A",
													},
												}}
											>
												<StyledTableCell scope="row" align="center">
													{employee.name}
												</StyledTableCell>
												<StyledTableCell scope="row" align="center">
													{employee.jobDescription}
												</StyledTableCell>
												<StyledTableCell scope="row" align="center">
													<List style={{ padding: "0" }}>
														{employee.schedules
															?.filter((schedule) => isToday(schedule))
															.map((schedule) => (
																<ListItem
																	key={schedule.id}
																	style={{ padding: "0", textAlign: "center" }}
																>
																	<ListItemText
																		primary={`${schedule.entryTime} - ${schedule.exitTime}`}
																	/>
																</ListItem>
															))}
													</List>
												</StyledTableCell>
												<StyledTableCell scope="row" align="center">
													{employee.present ? "Presente" : "Ausente"}
												</StyledTableCell>
												<StyledTableCell scope="row" align="center">
													<IconButton onClick={() => hanldeEditEmployee(employee.id)}>
														<EditIcon />
													</IconButton>
													<IconButton onClick={() => hanldeRemoveEmployee(employee.id)}>
														<DeleteIcon />
													</IconButton>
													<IconButton onClick={() => hanldeShowSchedulesOfEmployee(employee.id)}>
														<AccessTimeIcon />
													</IconButton>
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
												No hay empleados para mostrar
											</StyledTableCell>
										</StyledTableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>

					<ColorButton
						style={{ marginTop: "15px", marginLeft: "86%" }}
						onClick={() => handleNewEmployee()}
					>
						Añadir +
					</ColorButton>
				</Box>
			</Container>
		</>
	);
};
