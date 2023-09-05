import React from "react";
import COLORS from "../colors/COLORS";
import logoPic from "../assets/imgs/logoOfWeb.png";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { Box, Button, Typography } from "@mui/material";

const Footer = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const handleContactClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(ROUTES.CONTACTUS);
  };
  return (
    <Box
      component="div"
      sx={{
        backgroundColor: COLORS.MAIN,
        padding: "10px",
        textAlign: "center",
        display: "flex",
        gap: "2rem",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        sx={{
          aspectRatio: "2/1",
          width: "10%",
          minWidth: "180px",
          minHeight: "95px",
          borderRadius: "50px",
        }}
        src={logoPic}
        alt="logo of web in the footer section"
      />
      <Typography style={{ color: COLORS.TEXT1 }}>
        © {new Date().getFullYear()} MedEasy Pharmacy Services Inc.
        <br />
        All Rights Reserved
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        onClick={
          loc && loc.pathname == ROUTES.CONTACTUS ? null : handleContactClick
        }
        sx={{
          padding: 3,
          borderRadius: "20px 0 20px 0",
          transition: "all 0.3s linear",
          cursor:
            loc && loc.pathname == ROUTES.CONTACTUS ? "default" : "poiinter",
          filter:
            loc && loc.pathname == ROUTES.CONTACTUS ? "blur(5px)" : "none",
          ":hover": {
            transform:
              loc && loc.pathname == ROUTES.CONTACTUS ? "none" : "rotate(5deg)",
          },
        }}
      >
        Need To Talk to Us? Click Here
      </Button>
    </Box>
  );
};

export default Footer;
