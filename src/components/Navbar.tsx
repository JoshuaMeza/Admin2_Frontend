import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface NavbarProps {
    options: {label:string, link: string}[];
}

const Navbar: React.FC<NavbarProps> = ({options}) => {

    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  className="appbar" style={{backgroundColor: '#DC7A20', height: '6.5vh'}}>
        <Toolbar variant="dense">
          <Typography variant="h4" color="black" component="div" style={{ fontWeight: 'bold'}}>
            AMS
          </Typography>
          {options.map((option, index) => (
            <div key={index} style={{ marginLeft: '20px'}}>
                <a href={option.link}>{option.label}</a>
            </div>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
    );
}

export default Navbar;