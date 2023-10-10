import { useLocation } from "react-router-dom";
import { dayTimes } from "../../components";
import {
	Autocomplete,
	Box,
	Button,
	ButtonProps,
	Container,
	FormControl,
	IconButton,
	Input,
	InputLabel,
	Modal,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Typography,
	styled,
	tableCellClasses,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { Day, FullEmployee, Job, Schedule } from "../../interfaces";
import {
	useDeleteSchedule,
	useGetControlledUser,
	useGetDays,
	useGetJobs,
	useGetSchedulesOfEmployee,
	useUpdateEmployee,
} from "../../api";
import { DeleteAlertDialog } from "../../components/DeleteAlertDialog";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: theme.palette.getContrastText("#CB8B2A"),
	backgroundColor: "#CB8B2A",
	"&:hover": {
		backgroundColor: "#C7882A",
	},
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#CB8B2A",
		color: theme.palette.common.black,
		fontSize: 14,
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

interface Column {
	id: string;
	label: string;
	minWidth: number;
}

export const AdminUsersEditEmployee = () => {
	const location = useLocation();
	const getDays = useGetDays();
	const getJobs = useGetJobs();
	const getSchedules = useGetSchedulesOfEmployee();
	const getEmployee = useGetControlledUser();
	const updateEmployee = useUpdateEmployee();
	const deleteSchedule = useDeleteSchedule();
	const [employee, setEmployee] = useState<FullEmployee>({
		id: 0,
		name: "",
		email: "",
		password: "",
		salary: 0,
		job: {
			id: 0,
			name: "",
			area: "",
		},
		active: true,
	});
	const [openAdd, setOpenAdd] = React.useState(false);
	const [openEdit, setOpenEdit] = React.useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const handleOpenAdd = () => setOpenAdd(true);
	const handleCloseAdd = () => setOpenAdd(false);
	const [dayLabels, setDayLabels] = useState<{ label: string }[]>([]);
	const [daysArray, setDaysArray] = useState<Day[]>([]);
	const [jobLabels, setJobLabels] = useState<{ label: string }[]>([]);
	const [jobsArray, setJobsArray] = useState<Job[]>([]);
	const columns: Column[] = [
		{ id: "entry", label: "Entrada", minWidth: 90 },
		{ id: "deparure", label: "Salida", minWidth: 90 },
		{ id: "operations", label: "Opciones", minWidth: 60 },
	];
	const [schedules, setSchedules] = useState<Schedule[]>([]);
	const [newSchedule, setNewSchedule] = useState<Schedule>({
		id: 0,
		entryDay: {
			id: 0,
			name: "",
		},
		entryTime: "",
		exitDay: {
			id: 0,
			name: "",
		},
		exitTime: "",
	});

	interface ScheduleCreationStructure {
		id: number;
		entryDayId: number;
		entryTime: string;
		exitDayId: number;
		exitTime: string;
	}

	const [updatableUser, setUpdatableUser] = useState<{
		id: number;
		name: string;
		email: string;
		password: string;
		salary: number;
		jobId: number;
		active: boolean;
		schedules: ScheduleCreationStructure[];
	}>({
		id: 0,
		name: "",
		email: "",
		password: "",
		salary: 0,
		jobId: 0,
		active: true,
		schedules: [],
	});

	const handleOpenEdit = (s: Schedule) => {
		setNewSchedule(s);
		setOpenEdit(true);
	};
	const handleOpenDelete = (s: Schedule) => {
		setNewSchedule(s);
		setOpenDelete(true);
	};
	const handleCloseEdit = () => {
		setOpenEdit(false);
	};
	const handleCloseDelete = () => {
		setOpenDelete(false);
	};

	const handleEditSchedule = (s: Schedule) => {
		const editableSchedule = schedules.findIndex((schedule) => schedule.id === s.id);
		if (editableSchedule >= 0) {
			schedules[editableSchedule] = s;
		}
		handleCloseEdit();
	};

	const handleDeleteSchedule = (scheduleId: number) => {
		const deletableSchedule = schedules.findIndex((schedule) => schedule.id === scheduleId);
		if (deletableSchedule >= 0 && deletableSchedule < schedules.length) {
			schedules.splice(deletableSchedule, 1);
		}
		handleCloseDelete();
	};

	const requestEmployee = (userId: number) => {
		getEmployee.mutate(userId, {
			onSuccess: (data) => {
				setEmployee(data);
			},
			onError: () => {
				console.log("Error al cargar los datos del empleado");
			},
		});
	};

	function transformDaysArray(days: Day[]): { label: string }[] {
		return days.map((day) => ({ label: day.name }));
	}

	function transformJobsArray(jobs: Job[]): { label: string }[] {
		return jobs.map((job) => ({ label: job.name }));
	}

	const requestDays = () => {
		getDays.mutate(undefined, {
			onSuccess: (data) => {
				setDaysArray(data);
				var transformedDays = transformDaysArray(data);
				setDayLabels(transformedDays);
			},
			onError: () => {
				console.log("Error al cargar los días");
			},
		});
	};

	const requestJobs = () => {
		getJobs.mutate(undefined, {
			onSuccess: (data) => {
				setJobsArray(data);
				var transformedJobs = transformJobsArray(data);
				setJobLabels(transformedJobs);
			},
		});
	};

	const requestEmployeeSchedule = (userId: number) => {
		getSchedules.mutate(userId, {
			onSuccess: (data) => {
				console.log(data);
				setSchedules(data);
			},
		});
	};

	const setEmployeeSalary = (salary: string) => {
		const salaryNum = Number(salary);
		setEmployee({ ...employee, salary: salaryNum });
	};

	const setEmployeeJobEntity = (jobName: string | null) => {
		const foundJob = jobsArray.find((jobObject) => jobObject.name === jobName);
		if (foundJob) {
			setEmployee({ ...employee, job: foundJob });
		}
	};

	const setScheduleEntryDay = (entry: string | null) => {
		const foundDay = daysArray.find((day) => day.name === entry);
		if (foundDay) {
			setNewSchedule({ ...newSchedule, entryDay: foundDay });
		}
	};

	const setScheduleExitDay = (exit: string | null) => {
		const foundDay = daysArray.find((day) => day.name === exit);
		if (foundDay) {
			setNewSchedule({ ...newSchedule, exitDay: foundDay });
		}
	};

	const handleAddSchedule = (newS: Schedule) => {
		if (newS) {
			setSchedules([...schedules, newS]);
			handleCloseAdd();
		} else {
			console.log("Error al agregar el nuevo horario");
		}
	};

	function transformSchedules(schedules: Schedule[]): ScheduleCreationStructure[] {
		var list: ScheduleCreationStructure[];

		return list;
	}

	const handleEditEmployee = () => {
		setUpdatableUser({
			id: employee.id,
			name: employee.name,
			email: employee.email,
			password: employee.password,
			salary: employee.salary,
			active: employee.active,
			jobId: employee.job.id,
			schedules: schedules,
		});
		requestEditEmployee();
	};

	const requestEditEmployee = () => {};
	const requestDeleteSchedule = () => {};

	useEffect(() => {
		requestEmployee(location.state.employee_id);
		requestEmployeeSchedule(location.state.employee_id);
		requestDays();
		requestJobs();
	}, []);

	const style = {
		position: "absolute" as "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 450,
		bgcolor: "#D9D9D9",
		boxShadow: 24,
		p: 2,
	};

	return (
		<>
			<DeleteAlertDialog
				isOpen={openDelete}
				onClose={handleCloseDelete}
				handleClose={() => handleDeleteSchedule(newSchedule.id)}
			></DeleteAlertDialog>
			<Container
				maxWidth="lg"
				sx={{
					minHeight: "80vh",
					display: "flex",
					alignItems: "start",
					justifyContent: "center",
				}}
			>
				<Box
					sx={{
						minWidth: "70%",
						bgcolor: "#F0EFEF",
						padding: "1rem 2rem",
						minHeight: "70vh",
					}}
				>
					<h3 style={{ marginTop: "0", fontSize: 24 }}>Edición de Empleado</h3>
					<div style={{ display: "table-row-group" }}>
						<div style={{ display: "table-cell", width: "50%" }}>
							<FormControl variant="standard" sx={{ width: "95%" }}>
								<InputLabel htmlFor="standard-adornment-correo" color="warning">
									Nombre Completo
								</InputLabel>
								<Input
									id="standard-adornment-amount"
									color="warning"
									value={employee?.name}
									onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
								/>
							</FormControl>
							<FormControl variant="standard" sx={{ width: "95%", marginTop: "7%" }}>
								<InputLabel htmlFor="standard-adornment-correo" color="warning">
									Correo electrónico
								</InputLabel>
								<Input
									id="standard-adornment-amount"
									color="warning"
									value={employee?.email}
									onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
								/>
							</FormControl>
							<Autocomplete
								disablePortal
								id="combo-box-demo"
								options={jobLabels}
								sx={{ width: "95%", marginTop: "10%" }}
								color="warning"
								value={{ label: employee.job.name }}
								onInputChange={(event: any, newValue: string | null) =>
									setEmployeeJobEntity(newValue)
								}
								renderInput={(params) => (
									<TextField {...params} label="Puesto de Trabajo" color="warning" />
								)}
							/>
							<FormControl variant="standard" sx={{ width: "95%", marginTop: "5%" }}>
								<InputLabel htmlFor="standard-adornment-correo" color="warning">
									Salario
								</InputLabel>
								<Input
									id="standard-adornment-amount"
									color="warning"
									value={employee.salary}
									onChange={(e) => setEmployeeSalary(e.target.value)}
								/>
							</FormControl>
						</div>
						<div style={{ display: "table-cell" }}>
							<h4>Horarios</h4>
							<Table>
								<TableHead>
									<TableRow>
										{columns.map((column) => (
											<StyledTableCell key={column.id} align="center" style={{}}>
												{column.label}
											</StyledTableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{schedules && schedules.length > 0 ? (
										schedules.map((row) => (
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
												<StyledTableCell component="th" scope="row" align="center">
													{row.exitDay.name} {row.exitTime}
												</StyledTableCell>
												<StyledTableCell>
													<IconButton aria-label="edit" onClick={() => handleOpenEdit(row)}>
														<EditIcon />
													</IconButton>
													<IconButton aria-label="delete" onClick={() => handleOpenDelete(row)}>
														<DeleteIcon />
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
												No hay horarios agregados
											</StyledTableCell>
										</StyledTableRow>
									)}
								</TableBody>
							</Table>
							<Button
								variant="contained"
								sx={{
									backgroundColor: "#ABABAB",
									color: "black",
									"&:hover": {
										backgroundColor: "#C7882A",
									},
									marginTop: "15px",
									marginLeft: "55%",
								}}
								onClick={handleOpenAdd}
							>
								Añadir Horario+
							</Button>
						</div>
					</div>
					<ColorButton variant="contained" style={{ marginTop: "5%" }} onClick={handleEditEmployee}>
						Editar Empleado
					</ColorButton>
					<Modal
						open={openAdd}
						onClose={handleCloseAdd}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<Typography id="modal-modal-title" variant="h6" component="h3">
								Nuevo Horario:
							</Typography>
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>
											<Typography>Entrada</Typography>
										</TableCell>
										<TableCell>
											<Autocomplete
												disablePortal
												id="combo-box-demo"
												options={dayLabels}
												sx={{ width: "100%" }}
												color="warning"
												onInputChange={(event: any, newValue: string | null) =>
													setScheduleEntryDay(newValue)
												}
												renderInput={(params) => (
													<TextField {...params} label="Día" color="warning" />
												)}
											/>
										</TableCell>
										<TableCell>
											<Autocomplete
												disablePortal
												id="combo-box-demo"
												options={dayTimes}
												sx={{ width: "100%" }}
												color="warning"
												onInputChange={(event: any, newValue: string) =>
													setNewSchedule({ ...newSchedule, entryTime: newValue + ":00" })
												}
												renderInput={(params) => (
													<TextField {...params} label="Horario" color="warning" />
												)}
											/>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Typography>Salida </Typography>
										</TableCell>
										<TableCell>
											<Autocomplete
												disablePortal
												id="combo-box-demo"
												options={dayLabels}
												sx={{ width: "100%" }}
												color="warning"
												onInputChange={(event: any, newValue: string | null) =>
													setScheduleExitDay(newValue)
												}
												renderInput={(params) => (
													<TextField {...params} label="Día" color="warning" />
												)}
											/>
										</TableCell>
										<TableCell>
											<Autocomplete
												disablePortal
												id="combo-box-demo"
												options={dayTimes}
												sx={{ width: "100%" }}
												color="warning"
												onInputChange={(event: any, newValue: string) =>
													setNewSchedule({ ...newSchedule, exitTime: newValue + ":00" })
												}
												renderInput={(params) => (
													<TextField {...params} label="Horario" color="warning" />
												)}
											/>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
							<Button
								variant="contained"
								sx={{
									backgroundColor: "#ABABAB",
									color: "black",
									"&:hover": {
										backgroundColor: "#C7882A",
									},
									marginTop: "20px",
									marginLeft: "65%",
								}}
								onClick={() => handleAddSchedule(newSchedule)}
							>
								Añadir Horario
							</Button>
						</Box>
					</Modal>
					<Modal
						open={openEdit}
						onClose={handleCloseEdit}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<Typography id="modal-modal-title" variant="h6" component="h3">
								Horario:
							</Typography>
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>
											<Typography>Entrada</Typography>
										</TableCell>
										<TableCell>
											<Autocomplete
												disablePortal
												id="combo-box-demo"
												options={dayLabels}
												sx={{ width: "100%" }}
												color="warning"
												value={{ label: newSchedule.entryDay.name }}
												onInputChange={(event: any, newValue: string | null) =>
													setScheduleEntryDay(newValue)
												}
												renderInput={(params) => (
													<TextField {...params} label="Día" color="warning" />
												)}
											/>
										</TableCell>
										<TableCell>
											<Autocomplete
												disablePortal
												id="combo-box-demo"
												options={dayTimes}
												sx={{ width: "100%" }}
												color="warning"
												value={{ label: newSchedule.entryTime }}
												onInputChange={(event: any, newValue: string) =>
													setNewSchedule({ ...newSchedule, entryTime: newValue })
												}
												renderInput={(params) => (
													<TextField {...params} label="Horario" color="warning" />
												)}
											/>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Typography>Salida </Typography>
										</TableCell>
										<TableCell>
											<Autocomplete
												disablePortal
												id="combo-box-demo"
												options={dayLabels}
												sx={{ width: "100%" }}
												color="warning"
												value={{ label: newSchedule.exitDay.name }}
												onInputChange={(event: any, newValue: string | null) =>
													setScheduleExitDay(newValue)
												}
												renderInput={(params) => (
													<TextField {...params} label="Día" color="warning" />
												)}
											/>
										</TableCell>
										<TableCell>
											<Autocomplete
												disablePortal
												id="combo-box-demo"
												options={dayTimes}
												sx={{ width: "100%" }}
												color="warning"
												value={{ label: newSchedule.exitTime }}
												onInputChange={(event: any, newValue: string) =>
													setNewSchedule({ ...newSchedule, exitTime: newValue })
												}
												renderInput={(params) => (
													<TextField {...params} label="Horario" color="warning" />
												)}
											/>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
							<Button
								variant="contained"
								sx={{
									backgroundColor: "#ABABAB",
									color: "black",
									"&:hover": {
										backgroundColor: "#C7882A",
									},
									marginTop: "20px",
									marginLeft: "65%",
								}}
								onClick={() => handleEditSchedule(newSchedule)}
							>
								Editar Horario
							</Button>
						</Box>
					</Modal>
				</Box>
			</Container>
		</>
	);
};
