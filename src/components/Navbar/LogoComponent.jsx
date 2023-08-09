import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import ChairIcon from "@mui/icons-material/Chair";
import UIcon from "../../assets/imgs/letter-u_10150099.png";
import COLORS from "../../colors/COLORS";
import "./navbar.css";
const LogoComponent = (props) => {
  return (
    <Fragment>
      <ChairIcon
        sx={{
          display: {
            xs: "flex",
          },
          mr: 1,
        }}
      />
      <Typography
        onClick={props.handleIconClickFunc}
        variant="h6"
        noWrap
        className="navbarMain"
        sx={{
          mr: 2,
          display: {
            xs: "flex",
          },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".2rem",
          color: "inherit",
          textDecoration: "none",
          alignItems: "center",
          textShadow: "0 0 2px black",
        }}
      >
        FORNIT
        {<img src={UIcon} style={{ height: "22px", marginRight: "4px" }} />}
        <Box sx={{ color: COLORS.INVERTEDFROMMAIN }}>RIZE</Box>
      </Typography>
    </Fragment>
  );
};

export default LogoComponent;
