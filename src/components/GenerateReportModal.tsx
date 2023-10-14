import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	SelectChangeEvent,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from "@mui/material";
import { ReportType } from "../constants";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	handleClose: (reportTypeId: number, data: UserInput) => void;
}

interface ReportOption {
	id: number;
	label: string;
}

interface UserInput {
	startDate: Dayjs | null;
	endDate: Dayjs | null;
}

export const GenerateReportModal = ({ isOpen, onClose, handleClose }: Props) => {
	const reports: ReportOption[] = [
		{ id: ReportType.Users, label: "Listado de usuarios" },
		{ id: ReportType.Payments, label: "Conteo de horas y pagos" },
		{ id: ReportType.History, label: "Historial de asistencia" },
	];
	const [reportType, setReportType] = useState<ReportOption>(reports[0]);
	const [userInput, setUserInput] = useState<UserInput>({
		startDate: dayjs().startOf("day"),
		endDate: dayjs().startOf("day").add(1, "day"),
	});
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 650,
		bgcolor: "#D9D9D9",
		boxShadow: 24,
		p: 2,
	};

	const selectReport = (event: SelectChangeEvent) => {
		setReportType(
			reports.find((report) => report.id == parseInt(event.target.value)) || reports[0]
		);
	};

	return (
		<>
			<Modal open={isOpen} onClose={onClose}>
				<Box sx={style}>
					<Typography variant="h6" component="h3">
						Generar Reporte
					</Typography>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell sx={{ width: "30%" }}>
									<Typography>Tipo de reporte</Typography>
								</TableCell>
								<TableCell sx={{ width: "70%" }}>
									<FormControl fullWidth>
										<InputLabel>Selecciona un tipo</InputLabel>
										<Select
											value={`${reportType.id}`}
											label="Seleccione un tipo"
											onChange={(e) => selectReport(e)}
										>
											{reports.map((report) => (
												<MenuItem key={report.id} value={report.id}>
													{report.label}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</TableCell>
							</TableRow>
							{reportType.id == ReportType.Payments || reportType.id == ReportType.History ? (
								<TableRow>
									<TableCell>
										{reportType.id == ReportType.Payments ? "Fecha de inicio" : "Fecha"}
									</TableCell>
									<TableCell>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DemoContainer components={["DatePicker"]}>
												<DatePicker
													sx={{ width: "100%" }}
													label="Selecciona un día"
													value={userInput.startDate}
													onChange={(newValue) =>
														setUserInput({ ...userInput, startDate: newValue })
													}
												/>
											</DemoContainer>
										</LocalizationProvider>
									</TableCell>
								</TableRow>
							) : undefined}
							{reportType.id == ReportType.Payments ? (
								<TableRow>
									<TableCell>Fecha de finalización</TableCell>
									<TableCell>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DemoContainer components={["DatePicker"]}>
												<DatePicker
													sx={{ width: "100%" }}
													label="Selecciona un día"
													value={userInput.endDate}
													minDate={userInput.startDate}
													onChange={(newValue) => setUserInput({ ...userInput, endDate: newValue })}
												/>
											</DemoContainer>
										</LocalizationProvider>
									</TableCell>
								</TableRow>
							) : undefined}
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
							display: "block",
							margin: "20px auto 0",
						}}
						onClick={() => handleClose(reportType.id, userInput)}
					>
						Guardar
					</Button>
				</Box>
			</Modal>
		</>
	);
};
