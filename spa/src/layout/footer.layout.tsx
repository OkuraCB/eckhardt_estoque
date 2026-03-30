import { Box, Container, Paper, useTheme } from "@mui/material";
import { forwardRef } from "react";

interface FooterProps {}

export const Footer = forwardRef<HTMLElement, FooterProps>((_props, ref) => {
  const theme = useTheme();

  return (
    <Paper
      ref={ref}
      sx={{
        width: "100%",
        borderRadius: 3,
        mt: 2,
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            textAlign: "center",
            display: "flex",
            color: theme.palette.text.secondary,
          }}
        >
          <footer>
            <p>&copy; 202X Arthur Illa. Todos os direitos reservados.</p>
          </footer>
        </Box>
      </Container>
    </Paper>
  );
});
