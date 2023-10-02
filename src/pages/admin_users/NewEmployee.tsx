import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { days, dayTimes } from "../../components";
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
import React from "react";

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

export const AdminUsersCreateEmployee = () => {
	const [openAdd, setOpenAdd] = React.useState(false);
	const handleOpenAdd = () => setOpenAdd(true);
	const handleCloseAdd = () => setOpenAdd(false);
	const columns: Column[] = [
		{ id: "entry", label: "Entrada", minWidth: 120 },
		{ id: "deparure", label: "Salida", minWidth: 120 },
	];

	const rows = [
		{
			entryD: "Lunes", entryH: "9:00", departureD: "Lunes", departureH: "17:00"
		},
		{
			entryD: "Lunes", entryH: "9:00", departureD: "Lunes", departureH: "17:00"
		},
		{
			entryD: "Lunes", entryH: "9:00", departureD: "Lunes", departureH: "17:00"
		},
		{
			entryD: "Lunes", entryH: "9:00", departureD: "Lunes", departureH: "17:00"
		},
		{
			entryD: "Lunes", entryH: "9:00", departureD: "Lunes", departureH: "17:00"
		},
		
	];

	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 450,
		bgcolor: '#D9D9D9',
		boxShadow: 24,
		p: 2,
	  };

	const puestos = [
		{label: "Químico"},
		{label: "Líder de Proyecto"},
		{label: "Contador"},
		{label: "Guardia"},
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
					sx={{ minWidth: "70%", bgcolor: "#F0EFEF", padding: "1rem 2rem", minHeight: "65vh" }}
				>
					<h3 style={{ marginTop: "0", fontSize:24 }}>Nuevo Empleado</h3>
                    <Table>
                        <TableBody>
                            <TableCell sx={{height: "100%"}}>
                                <div>
                                    <FormControl variant="standard" sx={{width:"100%"}}>
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
                                    <FormControl variant="standard" sx={{width:"100%", marginTop:"7%"}}>
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
                                    <FormControl variant="standard" sx={{width:"100%", marginTop:"7%"}}>
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
									<Autocomplete
										disablePortal
										id="combo-box-demo"
										options={puestos}
										sx={{ width: "100%", marginTop: "10%" }}
										color="warning"
										onInputChange={(event: any, newValue: string | null ) => {
											
										}}
										renderInput={(params) => <TextField {...params} label="Puesto de Trabajo" color="warning"/>}
									/>
								</div>
                                <div>
                                    <FormControl variant="standard" sx={{width:"100%", marginTop:"5%"}}>
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
                                <div style={{marginTop: "5%"}}>
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
                                    <Table sx={{height:"95%"}}>
                                        <TableHead>
                                            <TableRow>
												{columns.map((column) => (
												<StyledTableCell
													key={column.id}
													align="center"
													style={{}}
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
												<StyledTableCell
													component="th"
													scope="row"
													align="center"
												>
													{row.departureD} {row.departureH}
												</StyledTableCell>
											</StyledTableRow>
											))}
										</TableBody>

                                    </Table>
                                </div>
								<div>
								<Button 
									variant="contained" 
									sx={{
										backgroundColor: "#ABABAB", 
										color:"black", 
										"&:hover":{
											backgroundColor: "#C7882A",
										},
										marginTop: "15px",
										marginLeft: "51%"
									}}
									onClick={handleOpenAdd}
									>
									Añadir Horario+
								</Button>
								</div>
                                
                            </TableCell>
                        </TableBody>
                    </Table>
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
											options={days}
											sx={{ width: "100%" }}
											color="warning"
											onInputChange={(event: any, newValue: string | null ) => {
												
											}}
											renderInput={(params) => <TextField {...params} label="Día" color="warning"/>}
										/>
									</TableCell>
									<TableCell>
										<Autocomplete
												disablePortal
												id="combo-box-demo"
												options={dayTimes}
												sx={{ width: "100%" }}
												color="warning"
												onInputChange={(event: any, newValue: string | null ) => {
													
												}}
												renderInput={(params) => <TextField {...params} label="Horario" color="warning"/>}
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
												options={days}
												sx={{ width: "100%" }}
												color="warning"
												onInputChange={(event: any, newValue: string | null ) => {
													
												}}
												renderInput={(params) => <TextField {...params} label="Día" color="warning"/>}
											/>
									</TableCell>
									<TableCell>
										<Autocomplete
												disablePortal
												id="combo-box-demo"
												options={dayTimes}
												sx={{ width: "100%" }}
												color="warning"
												onInputChange={(event: any, newValue: string | null ) => {
													
												}}
												renderInput={(params) => <TextField {...params} label="Horario" color="warning"/>}
											/>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
						<Button 
							variant="contained" 
							sx={{
								backgroundColor: "#ABABAB", 
								color:"black", 
								"&:hover":{
									backgroundColor: "#C7882A",
								},
								marginTop: "20px",
								marginLeft: "65%"
							}}>
								Añadir Puesto
							</Button>
						</Box>
					</Modal>							
				</Box>
			</Container>
		</>
	);
};
