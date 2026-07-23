import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { Pace, WindupChildren } from "windups";
import { useAppSelector } from "../../app/hooks";
import homepage from "../../assets/homepage.svg";
import { selectUser } from "../users/usersSlice";
import { TabelaDefaultDialog } from "./tabelaDefault";

export const Home = () => {
    const user = useAppSelector(selectUser);
    const [defaultDialog, setDialog] = useState<boolean>(false);

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
                                <span style={{ fontSize: 60 }}>Hi, {user.name}!</span>
                            </Pace>
                        </WindupChildren>
                    </Grid>
                    <Grid>
                        <span>That's the template</span>
                        <br />
                        <br />
                        <span>Good luck!</span>
                    </Grid>

                    <Grid container spacing={2} sx={{ marginTop: 2, flexDirection: "row", justifyContent: "center" }}>
                        <Grid>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    console.log("console found!");
                                }}
                            >
                                Console print
                            </Button>
                        </Grid>
                        <Grid>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    setDialog(true);
                                }}
                            >
                                Default Dialog
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
            <TabelaDefaultDialog
                onClose={() => {
                    setDialog(false);
                }}
                open={defaultDialog}
            />
        </>
    );
};
