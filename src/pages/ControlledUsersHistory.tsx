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
	const columns: Column[] = [
		{ id: "day", label: "Día", minWidth: 200 },
		{ id: "entry", label: "Entrada", minWidth: 200 },
		{ id: "departure", label: "Salida", minWidth: 200 },
	];

	const rows = [
		{ day: "Miercoles", entry: "9:00 - 07/Sep/2023", exit: "No registrado" },
		{ day: "Martes", entry: "9:01 - 06/Sep/2023", exit: "17:00 - 06/Sep/2023" },
		{ day: "Lunes", entry: "9:02 - 05/Sep/2023", exit: "17:01 - 05/Sep/2023" },
	];

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
				<Box
					sx={{ minWidth: "70%", bgcolor: "#F0EFEF", padding: "2.5rem 1.5rem" }}
				>
					<h2 style={{ marginTop: '0' }}>Historial de asistencia</h2>
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
									{rows.map((row, index) => (
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
												{row.day}
											</StyledTableCell>
											<StyledTableCell scope="row" align="center">
												{row.entry}
											</StyledTableCell>
											<StyledTableCell scope="row" align="center">
												{row.exit}
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
