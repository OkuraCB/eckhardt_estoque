import { Box, Container } from "@mui/material";
import { useLayoutEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

import { Footer } from "./footer.layout";
import { Navbar } from "./navbar.layout";

export const DefaultLayout = () => {
  const navbarRef = useRef<HTMLElement | null>(null);

  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (footerRef.current) {
      setFooterHeight(footerRef.current.offsetHeight);
    }
  }, [navbarRef.current, footerRef.current]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container component="main" sx={{ mt: 1 }}>
        <Navbar ref={navbarRef} />

        <div style={{ flex: 1, minHeight: `calc(100vh-${footerHeight}px` }}>
          <Outlet />
        </div>

        <div ref={footerRef}>
          <Footer />
        </div>
      </Container>
    </Box>
  );
};
