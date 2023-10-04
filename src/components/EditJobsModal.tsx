import {
	Box,
	Modal,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
	Button,
	TextField,
} from "@mui/material";
import { Job } from "../interfaces";
import React from "react";
import { useUpdateJob } from "../api";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	job: Job;
}

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 450,
	bgcolor: "#D9D9D9",
	boxShadow: 24,
	p: 2,
};

export const EditJobsModal = ({ isOpen, onClose, job }: Props) => {
	const updateJob = useUpdateJob();
	const [newJob, setNewJob] = React.useState<Job>({
		id: job.id,
		name: job.name,
		area: job.area,
	});

	const requestUpdateJob = () => {
		console.log(job);
		console.log(newJob);
		updateJob.mutate(newJob, {
			onSuccess: () => {
				console.log("Puesto de trabajo actualizado");
				window.location.reload();
			},
			onError: () => {
				console.log("Error al tratar de actualizar el puesto de trabajo");
			},
		});
	};

	return (
		<>
			<Modal
				open={isOpen}
				onClose={onClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h3">
						Editar Puesto:
					</Typography>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>
									<Typography>Nombre: </Typography>
								</TableCell>
								<TableCell>
									<TextField
										id="outlined-size-small"
										size="small"
										className="input-name"
										color="warning"
										defaultValue={job.name}
										onChange={(e) =>
											setNewJob({
												...job,
												name: e.target.value,
											})
										}
									/>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Typography>Área: </Typography>
								</TableCell>
								<TableCell>
									<TextField
										id="outlined-size-small"
										size="small"
										className="input-area"
										color="warning"
										defaultValue={job.area}
										onChange={(e) =>
											setNewJob({
												...job,
												area: e.target.value,
											})
										}
									/>
								</TableCell>
							</TableRow>
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
							marginTop: "20px",
							marginLeft: "65%",
						}}
						onClick={requestUpdateJob}
					>
						Editar Puesto
					</Button>
				</Box>
			</Modal>
		</>
	);
};
