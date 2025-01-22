import React from "react";
import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(45deg, #1e3c72, #2a5298)", // Modern gradient background
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      <Toolbar>
        {/* Logo/Title */}
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: "Poppins, sans-serif", // Modern font
            fontWeight: "600",
            color: "white",
            textTransform: "uppercase", // Uppercase title
            letterSpacing: "1px", // Spacing between letters
          }}
        >
          Job Portal
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                background: "rgba(255, 255, 255, 0.1)", // Transparent background
                color: "white",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.2)", // Hover effect
                },
              }}
            >
              Home
            </Button>
          </Link>
          <Link to="/create" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                background: "rgba(255, 255, 255, 0.1)", // Transparent background
                color: "white",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.2)", // Hover effect
                },
              }}
            >
              Add Job
            </Button>
          </Link>
          <a
            href="https://www.linkedin.com/in/milindkedare/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              sx={{
                background: "rgba(255, 255, 255, 0.1)", // Transparent background
                color: "white",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.2)", // Hover effect
                },
              }}
            >
              Contact
            </Button>
          </a>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
