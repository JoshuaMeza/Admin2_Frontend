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
import { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useDownloadUsersReport } from "../api";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

interface ReportOption {
	id: number;
	label: string;
	downloader: () => void;
}

interface UserInput {
	startDate: Dayjs | null;
	endDate: Dayjs | null;
}

export const GenerateReportModal = ({ isOpen, onClose }: Props) => {
	const downloadUsersReport = useDownloadUsersReport();
	const [reportType, setReportType] = useState<ReportOption>();
	const [userInput, setUserInput] = useState<UserInput>({
		startDate: null,
		endDate: null,
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
		setReportType(reports.find((report) => report.id == parseInt(event.target.value)));
	};

	const requestUsersReport = () => {
		return downloadUsersReport.mutate(undefined, {
			onSuccess(data) {
				handleDownloadExcel(data);
			},
		});
	};

	const handleDownloadExcel = (originalData: Blob) => {
		const data = new Blob([originalData], { type: "application/vnd.ms-excel" });
		const href = URL.createObjectURL(data);
		const link = document.createElement("a");
		link.href = href;
		link.setAttribute("download", "file.xls");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(href);
	};

	const reports: ReportOption[] = [
		{ id: ReportType.Users, label: "Listado de usuarios", downloader: requestUsersReport },
		{ id: ReportType.Payments, label: "Conteo de horas y pagos", downloader: () => {} },
		{ id: ReportType.History, label: "Historial de asistencia", downloader: () => {} },
	];

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
											value={reportType ? `${reportType.id}` : ""}
											label="Seleccione un tipo"
											onChange={selectReport}
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
							{reportType?.id == ReportType.Payments || reportType?.id == ReportType.History ? (
								<TableRow>
									<TableCell>
										{reportType?.id == ReportType.Payments ? "Fecha de inicio" : "Fecha"}
									</TableCell>
									<TableCell>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DemoContainer components={["DatePicker"]}>
												<DatePicker
													sx={{ width: "100%" }}
													label="Selecciona un día"
													value={userInput.startDate}
													onChange={(newValue) =>
														setUserInput({ startDate: newValue, endDate: null })
													}
												/>
											</DemoContainer>
										</LocalizationProvider>
									</TableCell>
								</TableRow>
							) : undefined}
							{reportType?.id == ReportType.Payments ? (
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
						onClick={() => reportType?.downloader()}
					>
						Guardar
					</Button>
				</Box>
			</Modal>
		</>
	);
};
