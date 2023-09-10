import React, { Fragment } from "react";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import SearchPartial from "../../components/Navbar/SearchPartial";
import logoPic from "../../assets/imgs/logoForNavbar.png";
//css
import "./homePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const mediaQ = useMediaQuery(theme.breakpoints.up("md"));
  const breakPoint = "md";
  const styleObjForItems = {
    border: "3px solid black",
    background: "#D8ACAF",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
    transition: "all 0.2s linear",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "rgba(74, 194, 47, 1)",
      transform: "scale(1.05)",
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
    <Fragment>
      <div style={{ backgroundColor: "red" }}>DO BY THE BRIEF!</div>
      {/* search div */}
      <Box
        component="div"
        sx={{
          marginBlock: "0.5rem",
          ml: "15vw",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <SearchPartial value={""} />
      </Box>
      <Container
        component="div"
        id="container"
        maxWidth="xl"
        sx={{
          display: "grid",
          gap: "1rem",
          gridTemplate: {
            [breakPoint]: "repeat(2,1fr)/20% 60% 20%",
          },
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
          className={mediaQ ? "item1" : ""}
          sx={{
            border: { [breakPoint]: "3px solid black" },
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: { xs: "column", xl: "row" },
            gap: "30px",
            order: -1,
            transition: "all 3 linear",
            borderRadius: { [breakPoint]: " 10px 10px 10px 10px " },
            background: {
              [breakPoint]:
                "linear-gradient(24deg, rgba(237,183,65,1) 9%, rgba(252,176,69,1) 26%, rgba(241,81,17,1) 51%, rgba(82,253,29,1) 73%)",
            },
          }}
        >
          <Box component="div">
            <Typography
              sx={{
                fontSize: { xs: "1.5rem", [breakPoint]: "4rem" },
                letterSpacing: "0.2rem",
              }}
            >
              Welcome to MedEasy
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1rem", [breakPoint]: "2rem" },
                letterSpacing: "0.2rem",
              }}
            >
              The place to buy the best medicines and supplements ever existed!
            </Typography>
          </Box>
          <Box
            component="img"
            src={logoPic}
            alt='the logo saying "med easy"'
            sx={{
              // display: { xs: "none", [breakPoint]: "block" },
              width: "60%",
              borderRadius: "10px",
              m: 2,
            }}
          />
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
            ...styleObjForItems,
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
    </Fragment>
  );
};

export default HomePage;
