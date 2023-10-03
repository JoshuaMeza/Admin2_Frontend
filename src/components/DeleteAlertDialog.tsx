import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	handleClose: () => void;
}

export const DeleteAlertDialog = ({ isOpen, onClose, handleClose }: Props) => {
	return (
		<>
			<Dialog open={isOpen} onClose={onClose}>
				<DialogTitle>¿Está seguro de que desea eliminarlo?</DialogTitle>
				<DialogActions style={{ display: "flex", justifyContent: "center" }}>
					<Button onClick={onClose}>Cancelar</Button>
					<Button onClick={handleClose} variant="outlined" color="error" autoFocus>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
