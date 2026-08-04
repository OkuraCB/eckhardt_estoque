import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleSnackbar } from "../../common/handleSnackbar";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import { IProduct, listProducts, selectProducts, sellProduct } from "../products/productSlice";
import { createSale } from "./salesSlice";

interface SaleDialogProps {
    onClose: any;
    open: boolean;
}

export const SalesDialog = ({ onClose, open }: SaleDialogProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const products = useAppSelector(selectProducts);

    const [confirm, setConfirm] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [name, setName] = useState<string>("")

    const [product, setProduct] = useState<IProduct | null>(null)

    useEffect(() => {
        if (products.length <=0) dispatch(listProducts())
    }, [open]);

    const resetVariables = () => {
        setEmail("")
        setPhone("")
        setName("")
        setProduct(null)
    };

    const create = () => {
        if (product) {
            const data = {
                email,
                phone,
                name,
                productId: product.id
            };

            try {
                dispatch(createSale(data));
                dispatch(sellProduct({productId: product.id}))
                handleClose();
            } catch (e) {
                handleClose();
            }

        } else {
            if (!product) handleSnackbar("Selecione um produto", "error")
        }
    };

    const handleClose = () => {
        onClose();
        resetVariables();
        setConfirm(false);
        navigate(location.pathname);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    justifySelf: "center",
                    width: "100%",
                    maxWidth: "md",
                    borderRadius: isMobile ? 0 : 2,
                }}
                fullScreen={isMobile}
            >
                <DialogTitle>Registrar venda</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ maxHeight: "50vh", justifyContent: "center" }}>
                        <Grid size={{ xs: 12 }}>
                            <Autocomplete
                                disablePortal
                                aria-required
                                options={products}
                                sx={{ marginTop: "20px" }}
                                getOptionLabel={(option)=>`${option.name} - ${option.collection?.name} - ${option.model?.name}`}
                                renderInput={(params) => <TextField {...params} label="Selecione o produto vendido" />}
                                onChange={(_event: any, value: any) => setProduct(value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <TextField
                                disabled={!product} 
                                label="Email do Comprador"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setEmail(event.target.value as string);
                                }} 
                            />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <TextField
                                disabled={!product} 
                                label="Telefone do Comprador"
                                variant="outlined"
                                fullWidth
                                value={phone}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setPhone(event.target.value as string);
                                }} 
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                disabled={!product} 
                                label="Nome do Comprador"
                                variant="outlined"
                                fullWidth
                                value={name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setName(event.target.value as string);
                                }} 
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button 
                        disabled={!product} 
                        variant="contained" onClick={() => setConfirm(true)}>
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>

            <ConfirmationDialog open={confirm} onClose={() => setConfirm(false)} executeFunction={create} />
        </>
    );
};
