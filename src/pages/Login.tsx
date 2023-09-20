import * as React from 'react';
import Box from '@mui/material/Box';
import Container  from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import  Navbar from '../components/Navbar';

export default function LoginTextFields() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 3, width: '25ch'},
            }}
            noValidate
            autoComplete='off'
            >
                <div className="div-input-form">
                    <FormControl sx={{ m:4, width: '65vh'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-correo">Correo</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                        />
                    </FormControl>
                </div>
                <div className="div-input-form">
                    <FormControl sx={{ m:4, width: '65vh'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
                        <Input
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
            </Box>
    );
}

const ColorButton = styled(Button)<ButtonProps>(({theme}) => ({
    color: theme.palette.getContrastText('#CB8B2A'),
    backgroundColor: '#CB8B2A',
    '&:hover': {
        backgroundColor: '#C7882A'
    }
}));

export const Login = () => {
    const options: {label: string; link: string} [] = [
        // { label: 'Inicio', link: '/' },
        // { label: 'Servicios', link: '/servicios' },
        // { label: 'Acerca de', link: '/acerca-de' },
    ];
    return (
		<>  
            <Navbar options={options} />
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="md" style={{height: '100vh', display: 'flex', alignItems: 'center'}}>
                    <Box sx={{bgcolor: '#F0EFEF', width: '100%', height:'60vh'}} className="content-box">
                        <div>
                            <h2>Bienvenido al sistema AMS</h2>
                        </div> 
                        <LoginTextFields/>
                        <div className='div-button'>
                            <ColorButton variant="contained">Iniciar Sesión</ColorButton>
                        </div>    
                    </Box>
                </Container>
            </React.Fragment>
        </>
    )
}