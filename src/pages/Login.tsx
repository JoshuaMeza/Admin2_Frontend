import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';

export default function LoginTextFields() {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete='off'
            >
                <div>
                    <TextField
                        label="Correo"  
                        id="standard-basic"
                        defaultValue="ejemplo@correo.com"
                        variant="standard"
                    />
                </div>
                <div>
                    <TextField
                        label="Contraseña"  
                        id="standard-password-input"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                    />
                </div>
            </Box>
    );
}

export const Login = () => {
    return (
		<>
            <LoginTextFields/>
        </>
    )
}