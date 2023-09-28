import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
	Box,
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

export const AdminUsersEmployees = () => {
	const columns: Column[] = [
		{ id: "name", label: "Nombre", minWidth: 120 },
		{ id: "job", label: "Puesto", minWidth: 120 },
		{ id: "schedules", label: "Horario", minWidth: 120 },
		{ id: "presence", label: "Presencia", minWidth: 120 },
		{ id: "operations", label: "Operaciones", minWidth: 120 },
	];

	const rows = [
		{
			id: 1,
			name: "Ana Gomez",
			job: "Quimico",
			schedules: ["09:00 - 11:00", "13:00 - 16:00"],
			presence: true,
		},
		{
			id: 2,
			name: "Marco Ortiz",
			job: "Seguridad",
			schedules: ["07:00 - 15:00"],
			presence: true,
		},
		{
			id: 3,
			name: "Diego Lomas",
			job: "Quimico",
			schedules: ["14:00 - 20:00"],
			presence: false,
		},
		{
			id: 4,
			name: "Rosa Ek",
			job: "Lider de proyecto",
			schedules: ["09:00 - 17:00"],
			presence: true,
		},
	];

	const hanldeEditEmployee = (id: number) => {
		console.log(id);
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
				<Box
					sx={{ minWidth: "70%", bgcolor: "#F0EFEF", padding: "2.5rem 1.5rem" }}
				>
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
									{rows.map((employee) => (
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
												{employee.job}
											</StyledTableCell>
											<StyledTableCell scope="row" align="center">
												<List style={{ padding: "0" }}>
													{employee.schedules.map((schedule, index) => (
														<ListItem key={index} style={{ padding: "0" }}>
															<ListItemText primary={schedule} />
														</ListItem>
													))}
												</List>
											</StyledTableCell>
											<StyledTableCell scope="row" align="center">
												{employee.presence ? "Presente" : "Ausente"}
											</StyledTableCell>
											<StyledTableCell scope="row" align="center">
												<IconButton
													onClick={() => hanldeEditEmployee(employee.id)}
												>
													<EditIcon />
												</IconButton>
												<IconButton
													onClick={() => hanldeRemoveEmployee(employee.id)}
												>
													<DeleteIcon />
												</IconButton>
												<IconButton
													onClick={() =>
														hanldeShowSchedulesOfEmployee(employee.id)
													}
												>
													<AccessTimeIcon />
												</IconButton>
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
