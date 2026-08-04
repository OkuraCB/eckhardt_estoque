import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { Pace, WindupChildren } from "windups";
import productsSvg from "../../assets/products.svg";
import { SalesDialog } from "../sales/saleDialog";
import { ProductDialog } from "./productDialog";
import { ProductsTable } from "./table/table";

export const Products = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [productDialog, setProductDialog] = useState<boolean>(false);
    const [saleDialog, setSaleDialog] = useState<boolean>(false)

    return (
        <>
            <Grid
                container
                spacing={2}
                sx={{
                    flexDirection: "row",
                    minHeight: "85vh",
                    py: isMobile ? 5 : 2,
                }}
            >
                <Grid
                    container
                    sx={{
                        flexDirection: "column",
                        justifyContent: "center",
                        justifyItems: "center",
                        px: isMobile ? 2 : 4,
                    }}
                    size={{ sm: 6, xs: 12 }}
                >
                    <Grid>
                        <Box sx={{ mb: 3 }}>
                            <WindupChildren>
                                <Pace getPace={() => 60}>
                                    <Typography
                                        variant={isMobile ? "h4" : "h3"}
                                        component="span"
                                        sx={{
                                            fontWeight: 700,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        Meus produtos
                                    </Typography>
                                </Pace>
                            </WindupChildren>
                        </Box>
                    </Grid>
                    <Grid>
                        <span>
                            Nessa página você pode conferir todos os produtos cadastrados no sistema, adicionar novas vendas ou novas entradas na base de dados e apagar produtos que se tornaram obsoletos.
                        </span>
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{
                        flexDirection: "column",
                        justifyContent: "center",
                        justifyItems: "center",
                        alignItems: "center",
                        mt: isMobile ? 0 : 2,
                    }}
                    size={{ sm: 6, xs: 12 }}
                >
                    <img src={productsSvg} width="80%" />
                </Grid>
                <Grid
                    container
                    sx={{
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        justifyItems: "center",
                    }}
                >
                    <Box sx={{ maxWidth: "100%" }}>
                        <ProductsTable setProductDialog={setProductDialog} setSaleDialog={setSaleDialog}/>
                    </Box>
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
