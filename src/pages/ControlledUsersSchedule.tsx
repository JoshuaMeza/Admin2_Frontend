import * as React from 'react';
import Box from '@mui/material/Box';
import Container  from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

function createData(
    entryD: string,
    entryH: string,
    departureD: string,
    departureH: string
) {
    return { entryD, entryH, departureD, departureH};
}

const rows = [
    createData('Lunes', '9:00', 'Lunes', '17:00'),
    createData('Martes', '9:00', 'Martes', '17:00'),
    createData('Miercoles', '9:00', 'Miercoles', '17:00'),
    createData('Jueves', '9:00', 'Jueves', '17:00'),
    createData('Viernes', '9:00', 'Viernes', '17:00')
];


interface Column {
    id: 'entry' | 'departure';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {id: 'entry', label: 'Entrada', minWidth: 300},
    {id: 'departure', label: 'Salida', minWidth: 300} 
];

export const ControlledUsersSchedule = () => {
    const[page, setPage] = React.useState(0);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    return (
		<>  
            <CssBaseline/>
            <Container maxWidth="md" style={{height: '100vh', display: 'flex', alignItems: 'center'}}>
                <Box sx={{bgcolor: '#F0EFEF', width: '100%', height:'60vh'}} className="content-box">
                    <div>
                        <h2>¡Hola de nuevo Nombre de Usuario!</h2>
                    </div> 
                    <div>
                        <h2>Tu horario es:</h2>
                    </div>
                    <div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align='center'
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                    key={row.entryD}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row" align='center'>
                                        {row.entryD} {row.entryH}
                                    </TableCell>
                                    <TableCell align="center">{row.departureD} {row.departureH}</TableCell>
                                    
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                </TableContainer>
                </Paper>
                </div>
                </Box>
            </Container>
        </>
    )
}