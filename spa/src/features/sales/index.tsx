import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { Pace, WindupChildren } from "windups";
import salesSvg from "../../assets/sales.svg";
import { SalesDialog } from "./saleDialog";
import { SalesTable } from "./table/table";

export const Sales = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [saleDialog, setSaleDialog] = useState<boolean>(false);

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
                    Minhas vendas
                  </Typography>
                </Pace>
              </WindupChildren>
            </Box>
          </Grid>
          <Grid>
            <span>
              Aqui você pode conferir as vendas registradas, bem como nome,
              email e telefone de seus compradores!
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
          <img src={salesSvg} width="60%" />
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
          size={{ xs: 12 }}
        >
          <Box sx={{ width: "100%" }}>
            <SalesTable setSaleDialog={setSaleDialog} />
          </Box>
        </Grid>
      </Grid>

      <SalesDialog
        open={saleDialog}
        onClose={() => {
          setSaleDialog(false);
        }}
      />
    </>
  );
};
