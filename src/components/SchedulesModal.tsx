import {
	Box,
	Modal,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	styled,
	tableCellClasses,
} from "@mui/material";
import { ControlledUser } from "../interfaces";

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

interface Props {
	isOpen: boolean;
	onClose: () => void;
	employee: ControlledUser;
}

interface Column {
	id: string;
	label: string;
	minWidth: number;
}

export const SchedulesModal = ({ isOpen, onClose, employee }: Props) => {
	const columns: Column[] = [
		{ id: "entrySchedule", label: "Entrada", minWidth: 300 },
		{ id: "exitSchedule", label: "Salida", minWidth: 300 },
	];

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

	return (
		<>
			<Modal open={isOpen} onClose={onClose}>
				<Box sx={style}>
					<h2>Horario de {employee?.name}:</h2>
					<Table>
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
							{employee?.schedules && employee.schedules.length > 0 ? (
								employee.schedules.map((schedule) => (
									<StyledTableRow
										key={schedule.id}
										sx={{
											"&:last-child td, &:last-child th": { border: 0 },
											"&:nth-of-type(odd) .MuiTableCell-body": {
												color: "#CB8B2A",
											},
										}}
									>
										<StyledTableCell scope="row" align="center">
											{schedule.entryDay.name} {schedule.entryTime}
										</StyledTableCell>
										<StyledTableCell scope="row" align="center">
											{schedule.exitDay.name} {schedule.exitTime}
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
									<StyledTableCell scope="row" align="center" colSpan={2}>
										No hay empleados para mostrar
									</StyledTableCell>
								</StyledTableRow>
							)}
						</TableBody>
					</Table>
				</Box>
			</Modal>
		</>
	);
};
