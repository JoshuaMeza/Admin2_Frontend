import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  ButtonProps,
  Container,
  Icon,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  useGetJobs,
  useCreateJob,
  useUpdateJob,
  useDeleteJob,
} from "../../api";
import React, { useState, useEffect } from "react";
import { Job } from "../../interfaces";

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

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "black",
  backgroundColor: "#CB8B2A",
  "&:hover": {
    backgroundColor: "#C7882A",
  },
}));

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
  const getJobs = useGetJobs();
  const createJob = useCreateJob();
  const updateJob = useUpdateJob();
  const deleteJob = useDeleteJob();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleOpenEdit = (job: Job) => {
    setJob(job);
    setOpenEdit(true);
  };
  const handleOpenDelete = (job: Job) => {
    setJob(job);
    setOpenDelete(true);
  };
  const handleCloseAdd = () => setOpenAdd(false);
  const handleCloseEdit = () => {
    var newJob: Job = {
      id: 0,
      name: "",
      area: "",
    };
    setJob(newJob);
    setOpenEdit(false);
  };
  const handleCloseDelete = () => {
    var newJob: Job = {
      id: 0,
      name: "",
      area: "",
    };
    setJob(newJob);
    setOpenDelete(false);
  };

  useEffect(() => {
    requestJobs();
  }, []);

  const [rows, setRows] = useState<Job[]>([]);

  const [job, setJob] = useState<Job>({
    id: 0,
    name: "",
    area: "",
  });

  const requestJobs = () => {
    getJobs.mutate(undefined, {
      onSuccess: (data) => {
        console.log(data);
        setRows(data);
      },
      onError: () => {
        console.log("Error al cargar puestos de trabajo");
      },
    });
  };

  const requestCreateJob = () => {
    createJob.mutate(job, {
      onSuccess: (data) => {
        console.log("Puesto de trabajo creado con éxito");
        window.location.reload();
      },
      onError: () => {
        console.log("Error al crear puesto de trabajo");
      },
    });
  };

  const requestUpdateJob = () => {
    updateJob.mutate(job, {
      onSuccess: (data) => {
        console.log("Puesto de trabajo actualizado");
        window.location.reload();
      },
      onError: () => {
        console.log("Error al tratar de actualizar el puesto de trabajo");
      },
    });
  };

  const requestDeleteJob = () => {
    deleteJob.mutate(job, {
      onSuccess: (data) => {
        console.log("Puesto de trabajo eliminado");
        window.location.reload();
      },
      onError: () => {
        console.log("Error al tratar de eliminar el puesto de trabajo");
      },
    });
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
          <h3 style={{ marginTop: "0" }}>Tabla de puestos:</h3>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 450, minHeight: 300 }}>
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
                      key={row.id}
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
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleOpenEdit(row)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleOpenDelete(row)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <ColorButton
            style={{ marginTop: "15px", marginLeft: "86%" }}
            onClick={handleOpenAdd}
          >
            Añadir +
          </ColorButton>
          <Modal
            open={openAdd}
            onClose={handleCloseAdd}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h3">
                Nuevo Puesto:
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
                        onChange={(e) =>
                          setJob({ ...job, name: e.target.value })
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
                        onChange={(e) =>
                          setJob({ ...job, area: e.target.value })
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
                onClick={requestCreateJob}
              >
                Añadir Puesto
              </Button>
            </Box>
          </Modal>
          <Modal
            open={openEdit}
            onClose={handleCloseEdit}
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
                          setJob({
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
                          setJob({
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
          <Modal
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h3">
                ¿Desea eliminar el puesto?
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
                        disabled
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
                        disabled
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
                  marginLeft: "60%",
                }}
                onClick={requestDeleteJob}
              >
                Eliminar Puesto
              </Button>
            </Box>
          </Modal>
        </Box>
      </Container>
    </>
  );
};
