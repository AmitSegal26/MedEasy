import React from "react";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import "./homePage.css";
import COLORS from "../../colors/COLORS";

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const mediaQ = useMediaQuery(theme.breakpoints.up("md"));
  const breakPoint = "md";
  const styleObjForItems = {
    border: "3px solid black",
    backgroundColor: COLORS.MAIN,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
    transition: "all 0.2s linear",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#FABBC5",
      transform: "scale(1.1)",
      zIndex: 999,
    },
  };
  const styleObjForItems2 = {
    border: "3px solid black",
    backgroundColor: "#D8ACAF",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
    transition: "all 0.2s linear",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#386745",
      transform: "scale(1.1)",
      zIndex: 999,
    },
  };
  const handleBrowseProductsClick = () => {
    navigate(ROUTES.SHOP);
  };
  const handleReadMoreClick = () => {
    navigate(ROUTES.ABOUT);
  };
  const handleTalkToUsClick = () => {
    navigate(ROUTES.CONTACTUS);
  };
  return (
    <div style={{ height: "85vh" }}>
      <Container
        component="div"
        maxWidth="xl"
        sx={{
          display: "grid",
          gap: "1rem",
          gridTemplate: {
            [breakPoint]: "repeat(2,1fr)/20% 60% 20%",
          },
          height: "100%",
          width: "80%",
        }}
      >
        <Box
          onClick={handleTalkToUsClick}
          component="div"
          className={mediaQ ? "item" : ""}
          sx={{
            ...styleObjForItems,
            gridArea: { [breakPoint]: "1/1/3/2" },
            borderRadius: { [breakPoint]: "50px 10px 10px 50px" },
          }}
        >
          <Typography
            sx={{
              display: "flex",
              flexDirection: { [breakPoint]: "column" },
              alignItems: "center",
              justifyContent: "space-evenly",
              height: "90%",
              fontSize: { xs: "1rem", [breakPoint]: "4rem" },
            }}
          >
            <Box
              component="span"
              sx={{
                transform: { [breakPoint]: "rotate(35deg)" },
                marginRight: { [breakPoint]: "0", xs: "1.2rem" },
              }}
            >
              Talk
            </Box>
            <Box
              component="span"
              sx={{
                transform: { [breakPoint]: "rotate(-35deg)" },
                marginRight: { [breakPoint]: "0", xs: "1.2rem" },
              }}
            >
              To
            </Box>
            <Box
              component="span"
              sx={{ transform: { [breakPoint]: "rotate(35deg)" } }}
            >
              Us!
            </Box>
          </Typography>
        </Box>
        <Box
          component="div"
          className={mediaQ ? "item" : ""}
          sx={{
            ...styleObjForItems2,
            cursor: "default",
            order: -1,
            borderRadius: { [breakPoint]: " 10px 10px 10px 10px " },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.5rem", [breakPoint]: "4rem" },
              letterSpacing: "0.2rem",
            }}
          >
            Welcome to MedEasy
          </Typography>
        </Box>
        <Box
          onClick={handleReadMoreClick}
          component="div"
          className={mediaQ ? "item" : ""}
          sx={{
            ...styleObjForItems,
            borderRadius: { [breakPoint]: " 10px 50px 10px 10px " },
          }}
        >
          <Typography>Click here to read more about the website!</Typography>
        </Box>
        <Box
          onClick={handleBrowseProductsClick}
          component="div"
          className={mediaQ ? "item" : ""}
          sx={{
            ...styleObjForItems2,
            gridArea: { [breakPoint]: "2/2/3/4" },
            borderRadius: { [breakPoint]: " 10px 10px 50px 10px " },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.5rem", [breakPoint]: "4rem" },
              letterSpacing: "0.2rem",
            }}
          >
            Browse Products!
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;
