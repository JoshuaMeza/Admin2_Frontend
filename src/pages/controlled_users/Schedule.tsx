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

function createData(
	entryD: string,
	entryH: string,
	departureD: string,
	departureH: string
) {
	return { entryD, entryH, departureD, departureH };
}

const rows = [
	createData("Lunes", "9:00", "Lunes", "17:00"),
	createData("Martes", "9:00", "Martes", "17:00"),
	createData("Miercoles", "9:00", "Miercoles", "17:00"),
	createData("Jueves", "9:00", "Jueves", "17:00"),
	createData("Viernes", "9:00", "Viernes", "17:00"),
];

interface Column {
	id: "entry" | "departure";
	label: string;
	minWidth?: number;
	align?: "center";
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: "entry", label: "Entrada", minWidth: 300 },
	{ id: "departure", label: "Salida", minWidth: 300 },
];

export const ControlledUsersSchedule = () => {
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
					<h2 style={{ marginTop: '0' }}>¡Hola de nuevo Nombre de Usuario!</h2>
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
									{rows.map((row) => (
										<StyledTableRow
											key={row.entryD}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
												"&:nth-of-type(odd) .MuiTableCell-body": {
													color: "#CB8B2A",
												},
											}}
										>
											<StyledTableCell
												component="th"
												scope="row"
												align="center"
											>
												{row.entryD} {row.entryH}
											</StyledTableCell>
											<StyledTableCell align="center">
												{row.departureD} {row.departureH}
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
