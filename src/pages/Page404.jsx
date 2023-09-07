import React from "react";
import "./page404.css";
import { Box, Button, Container } from "@mui/material";
import defPic from "../assets/imgs/cardDefImg.png";
import logoPic from "../assets/imgs/logoOfWeb.png";
import { useNavigate } from "react-router-dom";
import ROUTES from "./../routes/ROUTES";

const Page404 = () => {
  const navigate = useNavigate();
  const handleReturnClick = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "space-around",
        justifyContent: "space-between",
        gap: "50px",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <Box
          component="img"
          id="left-pic"
          src={defPic}
          alt="the pills container default picture"
          sx={{
            width: "50%",
            borderRadius: "50px 0 0 50px",
            transition: "all 2s ease-in-out",
          }}
        />
        <h3>
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </h3>
        <Box
          id="right-pic"
          component="img"
          src={logoPic}
          alt="the logo"
          sx={{
            width: "50%",
            borderRadius: " 0 50px 50px 0",
            transition: "all 2s ease-in-out",
          }}
        />
      </Box>
      <Button onClick={handleReturnClick} color="error" variant="outlined">
        404 Page - Click here to return to home page
      </Button>
    </Container>
  );
};

export default Page404;
