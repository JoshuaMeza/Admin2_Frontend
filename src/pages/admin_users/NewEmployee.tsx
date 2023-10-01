import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
	Box,
	Button,
	ButtonProps,
	Container,
	FormControl,
	IconButton,
	Input,
	InputLabel,
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

export const AdminUsersCreateEmployee = () => {
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

	return (
		<>
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
					sx={{ minWidth: "70%", bgcolor: "#F0EFEF", padding: "2.5rem 1.5rem" }}
				>
					<h3 style={{ marginTop: "0" }}>Nuevo Empleado</h3>
                    <Table>
                        <TableBody>
                            <TableCell>
                                <div>
                                    <FormControl variant="standard" sx={{width:"55%"}}>
                                        <InputLabel htmlFor="standard-adornment-correo" color="warning">
                                            Nombre Completo
                                        </InputLabel>
                                        <Input
                                            id="standard-adornment-amount"
                                            color="warning"
                                            onChange={(e) => {}}
                                        />
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl variant="standard" sx={{width:"55%", marginTop:"2%"}}>
                                        <InputLabel htmlFor="standard-adornment-correo" color="warning">
                                            Correo electrónico
                                        </InputLabel>
                                        <Input
                                            id="standard-adornment-amount"
                                            color="warning"
                                            onChange={(e) => {}}
                                        />
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl variant="standard" sx={{width:"55%", marginTop:"2%"}}>
                                        <InputLabel htmlFor="standard-adornment-correo" color="warning">
                                            Contraseña
                                        </InputLabel>
                                        <Input
                                            id="standard-adornment-amount"
                                            color="warning"
                                            onChange={(e) => {}}
                                        />
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl variant="standard" sx={{width:"55%", marginTop:"2%"}}>
                                        <InputLabel htmlFor="standard-adornment-correo" color="warning">
                                            Salario
                                        </InputLabel>
                                        <Input
                                            id="standard-adornment-amount"
                                            color="warning"
                                            onChange={(e) => {}}
                                        />
                                    </FormControl>
                                </div>
                                <div style={{marginTop: "2%"}}>
                                    <ColorButton variant="contained">
                                        Crear Empleado
                                    </ColorButton>
					            </div>
                            </TableCell>
                            <TableCell>
                                <div style={{display:"flow"}}>
                                    <h4>Horarios</h4>
                                </div>
                                <div>
                                    <Table>
                                        <TableHead>
                                            Tab
                                        </TableHead>
                                        <TableBody></TableBody>

                                    </Table>
                                </div>
                                
                            </TableCell>
                        </TableBody>
                    </Table>

				</Box>
			</Container>
		</>
	);
};
