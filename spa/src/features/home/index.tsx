import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { Pace, WindupChildren } from "windups";
import { useAppSelector } from "../../app/hooks";
import homepage from "../../assets/homepage.svg";
import { ProductDialog } from "../products/productDialog";
import { SalesDialog } from "../sales/saleDialog";
import { selectUser } from "../users/usersSlice";

export const Home = () => {
    const user = useAppSelector(selectUser);

    const [productDialog, setProductDialog] = useState<boolean>(false)
    const [saleDialog, setSaleDialog] = useState<boolean>(false)

    return (
        <>
            <Grid container spacing={2} sx={{ flexDirection: "row", minHeight: "85vh" }}>
                <Grid
                    container
                    sx={{ flexDirection: "column", justifyContent: "center", justifyItems: "center" }}
                    size={{ xs: 6 }}
                >
                    <Grid>
                        <WindupChildren>
                            <Pace getPace={() => 60}>
                                <span style={{ fontSize: 60 }}>Olá, {user.name}!</span>
                            </Pace>
                        </WindupChildren>
                    </Grid>
                    <Grid>
                        <span>
                            Esse é o sistema de controle de estoque da Eckhardt & Eloy. Aqui você pode acessar o estoque
                            atual atualizado, as vendas, e uma visão macro de todo o negócio.
                        </span>
                    </Grid>

                    <Grid container spacing={2} sx={{ marginTop: 2, flexDirection: "row", justifyContent: "center" }}>
                        <Grid>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setProductDialog(true)
                                }}
                            >
                                Cadastrar Produto
                            </Button>
                        </Grid>
                        <Grid>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    setSaleDialog(true)
                                }}
                            >
                                Registrar Venda
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{
                        flexDirection: "column",
                        justifyContent: "center",
                        justifyItems: "center",
                        alignItems: "center",
                    }}
                    size={{ xs: 6 }}
                >
                    <img src={homepage} width="60%" />
                </Grid>
            </Grid>

            <ProductDialog
                open={productDialog}
                onClose={() => {
                    setProductDialog(false);
                }}
            />
            <SalesDialog
                open={saleDialog}
                onClose={() => {
                    setSaleDialog(false);
                }}
            />
        </>
    );
};
