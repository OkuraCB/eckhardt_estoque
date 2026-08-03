import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputAdornment,
    TextField,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleFloat, handleNumberOnly } from "../../common/handleNumbers";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import { listCollections, selectCollections } from "../collections/collectionsSlice";
import { listModels, selectModels } from "../models/modelsSlice";
import { createProduct } from "./productSlice";

interface ProductDialogProps {
    onClose: any;
    open: boolean;
    tab?: number;
}

export const ProductDialog = ({ onClose, open }: ProductDialogProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const collections = useAppSelector(selectCollections);
    const models = useAppSelector(selectModels);

    const [confirm, setConfirm] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [qty, setQty] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [collection, setCollection] = useState<string | null>(null);
    const [model, setModel] = useState<string | null>(null);
    const [addon, setAddon] = useState<string>("");
    const [length, setLength] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [heightAddon, setHeightAddon] = useState<number>(0);
    const [image1, setImage1] = useState<File | null>(null);
    const [image2, setImage2] = useState<File | null>(null);
    const [image3, setImage3] = useState<File | null>(null);

    useEffect(() => {
        dispatch(listCollections());
        dispatch(listModels());
    }, [open]);

    const resetVariables = () => {
        setName("");
        setCode("");
        setPrice(0);
        setQty(0);
        setDescription("");
        setCollection(null);
        setModel(null);
        setAddon("");
        setLength(0);
        setWidth(0);
        setHeight(0);
        setHeightAddon(0);
        setImage1(null);
        setImage2(null);
        setImage3(null);
    };

    const create = () => {
        if (name && price && qty) {
            const data = {
                name,
                code,
                price,
                qty,
                description,
                length,
                width,
                height,
                heightAddon,
                image1,
                image2,
                image3,
                collectionName: collection,
                modelName: model,
                addonName: addon,
            };

            try {
                dispatch(createProduct(data));
                handleClose();
            } catch (e) {
                handleClose();
            }
        }
    };

    const handleClose = () => {
        onClose();
        resetVariables();
        setConfirm(false);
        navigate(location.pathname);
    };

    const handleSendDisabled = () => {
        if (name! || price! || qty!) return false;
        return true;
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
                <DialogTitle>Cadastrar novo produto</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ maxHeight: "50vh", justifyContent: "center" }}>
                        <Grid size={{ xs: 9 }}>
                            <TextField
                                label="Nome"
                                variant="outlined"
                                required
                                fullWidth
                                value={name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setName(event.target.value as string);
                                }}
                                sx={{ marginTop: "20px" }}
                            />
                        </Grid>
                        <Grid size={{ xs: 3 }}>
                            <TextField
                                label="SKU"
                                variant="outlined"
                                fullWidth
                                value={code}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setCode(event.target.value as string);
                                }}
                                sx={{ marginTop: "20px" }}
                            />
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                            <Autocomplete
                                freeSolo
                                resetHighlightOnMouseLeave
                                options={collections}
                                renderInput={params => <TextField {...params} label="Coleção" />}
                                getOptionLabel={option => (typeof option === "string" ? option : option.name)}
                                isOptionEqualToValue={(option, value) => {
                                    if (typeof value === "string") {
                                        return option.name === value;
                                    }
                                    return option.name === value.name;
                                }}
                                onChange={(_event: any, value: any) =>
                                    value?.name ? setCollection(value.name) : setCollection(value)
                                }
                            />
                        </Grid>
                        <Grid size={{ xs: 3 }}>
                            <Autocomplete
                                freeSolo
                                resetHighlightOnMouseLeave
                                options={models}
                                renderInput={params => <TextField {...params} label="Modelo" />}
                                getOptionLabel={option => (typeof option === "string" ? option : option.name)}
                                isOptionEqualToValue={(option, value) => {
                                    if (typeof value === "string") {
                                        return option.name === value;
                                    }
                                    return option.name === value.name;
                                }}
                                onChange={(_event: any, value: any) =>
                                    value?.name ? setModel(value.name) : setModel(value)
                                }
                            />
                        </Grid>
                        <Grid size={{ xs: 3 }}>
                            <TextField
                                label="Preço"
                                slotProps={{
                                    input: {
                                        endAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    },
                                }}
                                variant="outlined"
                                required
                                fullWidth
                                value={price}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleFloat(event, setPrice);
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 2 }}>
                            <TextField
                                label="Quantidade"
                                variant="outlined"
                                required
                                fullWidth
                                value={qty}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleNumberOnly(event, setQty);
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                            <TextField
                                label="Adicional"
                                variant="outlined"
                                fullWidth
                                value={addon}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setAddon(event.target.value as string);
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 2 }}>
                            <TextField
                                label="Comprimento"
                                variant="outlined"
                                fullWidth
                                value={length}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleNumberOnly(event, setLength);
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 2 }}>
                            <TextField
                                label="Largura"
                                variant="outlined"
                                fullWidth
                                value={width}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleNumberOnly(event, setWidth);
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 2 }}>
                            <TextField
                                label="Altura"
                                variant="outlined"
                                fullWidth
                                value={height}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleNumberOnly(event, setHeight);
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 2 }}>
                            <TextField
                                label="Altura (com adicional)"
                                variant="outlined"
                                fullWidth
                                value={heightAddon}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleNumberOnly(event, setHeightAddon);
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Descrição"
                                variant="outlined"
                                fullWidth
                                value={description}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setDescription(event.target.value as string);
                                }}
                            />
                        </Grid>
                        //TODO IMAGES
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button disabled={handleSendDisabled()} variant="contained" onClick={() => setConfirm(true)}>
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>

            <ConfirmationDialog open={confirm} onClose={() => setConfirm(false)} executeFunction={create} />
        </>
    );
};
