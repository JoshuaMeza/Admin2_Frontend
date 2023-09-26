import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import { Container, Icon } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
	name: string,
	area: string,
) {
	return { name, area };
}

const rows = [
	createData("Químico", "Producción"),
    createData("Seguridad", "Infraestructura"),
    createData("Contador", "Contaduría"),
    createData("Líder de Proyecto", "Producción"),
    createData("Intendencia", "Infraestructura"),
];

interface Column {
	id: "job" | "department" | "operations";
	label: string;
	minWidth?: number;
	align?: "center";
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: "job", label: "Puesto", minWidth: 200 },
	{ id: "department", label: "Área", minWidth: 200 },
    { id: "operations", label: "Operaciones", minWidth: 200 },
];

export const AdminUsersJobs = () => {
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
					<h3 style={{ marginTop: '0' }}>Tabla de puestos:</h3>
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
											key={row.name}
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
												{row.name}
											</StyledTableCell>
											<StyledTableCell align="center">
												{row.area}
											</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <EditIcon></EditIcon>
												<DeleteIcon></DeleteIcon>
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
