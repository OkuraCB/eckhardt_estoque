import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface ConfirmationDialogProps {
  onClose: any;
  open: boolean;
  executeFunction: any;
}

export const ConfirmationDialog = ({
  onClose,
  open,
  executeFunction,
}: ConfirmationDialogProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    onClose(true);
    navigate(location.pathname);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmação</DialogTitle>
      <DialogContent>Gostaria de continuar?</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={executeFunction}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};
