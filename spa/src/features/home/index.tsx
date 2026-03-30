import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { Pace, WindupChildren } from "windups";
import { useAppSelector } from "../../app/hooks";
import homepage from "../../assets/homepage.svg";
import { selectUser } from "../users/usersSlice";

export const Home = () => {
  const user = useAppSelector(selectUser);
  const [defaultDialog, setDialog] = useState<boolean>(false);

  return (
    <>
      <Grid container spacing={2} flexDirection="row" minHeight="85vh">
        <Grid
          container
          item
          flexDirection="column"
          justifyContent="center"
          justifyItems="center"
          xs={6}
        >
          <Grid item>
            <WindupChildren>
              <Pace getPace={() => 60}>
                <span style={{ fontSize: 60 }}>Hi, {user.name}!</span>
              </Pace>
            </WindupChildren>
          </Grid>
          <Grid item>
            <span>That's the template</span>
            <br />
            <br />
            <span>Good luck!</span>
          </Grid>

          <Grid
            container
            item
            spacing={2}
            marginTop={2}
            flexDirection="row"
            justifyContent="center"
          >
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  console.log("console found!");
                }}
              >
                Console print
              </Button>
            </Grid>
            <Grid item>
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
          item
          flexDirection="column"
          justifyContent="center"
          justifyItems="center"
          alignItems="center"
          xs={6}
        >
          <img src={homepage} width="60%" />
        </Grid>
      </Grid>
      {/* <TabelaDefaultDialog
        onClose={() => {
          setDialog(false);
        }}
        open={defaultDialog}
      /> */}
    </>
  );
};
