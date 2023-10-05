import {
	Box,
	Container,
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
import { AttendanceRecord, PaginationData, SessionUser } from "../../interfaces";
import { useEffect, useState } from "react";
import { useGetHistoryOfControlledUser } from "../../api/controlled_users";
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
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

interface Column {
	id: string;
	label: string;
	minWidth: number;
}

export const ControlledUsersHistory = () => {
	const [records, setRecords] = useState<AttendanceRecord[]>([]);
	const getHistoryOfControlledUser = useGetHistoryOfControlledUser();
	const columns: Column[] = [
		{ id: "day", label: "Día", minWidth: 200 },
		{ id: "entry", label: "Entrada", minWidth: 200 },
		{ id: "departure", label: "Salida", minWidth: 200 },
	];

	useEffect(() => {
		loadHistory();
	}, []);

	const loadHistory = function () {
		const pagination: PaginationData = { page: 0, perPage: 20 };
		const sessionUser: SessionUser = getSession();
		getHistoryOfControlledUser.mutate(
			{ user_id: sessionUser.id, pagination },
			{
				onSuccess(data) {
					setRecords(data);
				},
			}
		);
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
					<h2 style={{ marginTop: "0" }}>Historial de asistencia</h2>
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
									{records.map((record, index) => (
										<StyledTableRow
											key={index}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
												"&:nth-of-type(odd) .MuiTableCell-body": {
													color: "#CB8B2A",
												},
											}}
										>
											<StyledTableCell scope="row" align="center">
												{record.dayName}
											</StyledTableCell>
											<StyledTableCell scope="row" align="center">
												{record.entryDatetime || "No registrado"}
											</StyledTableCell>
											<StyledTableCell scope="row" align="center">
												{record.exitDatetime || "No registrado"}
											</StyledTableCell>
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</Box>
			</Container>
		</>
	);
};
