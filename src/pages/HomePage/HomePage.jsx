import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import SearchPartial from "../../components/Navbar/SearchPartial";
import axios from "axios";
import makeALegitStringForImage from "../../utils/makeALegitStringForImage";
import makeTitle from "../../utils/makeATitle";
import COLORS from "../../colors/COLORS";
import logoPic from "../../assets/imgs/MedEasyIcon.png";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CollectionsIcon from "@mui/icons-material/Collections";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import ContactMailIcon from "@mui/icons-material/ContactMail";
//css
import "./homePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const mediaQ = useMediaQuery(theme.breakpoints.down("md"));
  const [cardsArrForHomePage, setCardsArrForHomePage] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(
          "http://localhost:8181/api/cards/allCards"
        );
        if (data.length >= 2) {
          data.length = 2;
        }
        setCardsArrForHomePage(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const breakPoint = "md";
  const handleBrowseProductsClick = () => {
    navigate(ROUTES.SHOP);
  };
  const handleReadMoreClick = () => {
    navigate(ROUTES.ABOUT);
  };
  const handleTalkToUsClick = () => {
    navigate(ROUTES.CONTACTUS);
  };
  const handleGalleryClick = () => {
    navigate(ROUTES.GALLERY);
  };
  const arrOfLinks = [
    {
      icon: <ShoppingBasketIcon />,
      color: "success",
      text: "To our shop",
      func: handleBrowseProductsClick,
    },
    {
      icon: <HelpCenterIcon />,
      color: "info",
      text: "More about us",
      func: handleReadMoreClick,
    },
    {
      icon: <ContactMailIcon />,
      color: "secondary",
      text: "Talk to us",
      func: handleTalkToUsClick,
    },
    {
      icon: <CollectionsIcon />,
      color: "warning",
      text: "View our gallery",
      func: handleGalleryClick,
    },
  ];
  return (
    <Fragment>
      {/* banner */}
      <Box component="div" className="banner">
        <Typography gutterBottom component="h1">
          Welcome to MedEasy
        </Typography>
      </Box>
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
      {/* Content */}
      <Container
        maxWidth="xl"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          gutterBottom
          component="h2"
          variant="h4"
          sx={{
            mt: 3,
          }}
        >
          The place to get yourself the best quality of medicines and
          supplements!
        </Typography>
        <Divider flexItem />
        <Typography variant="h6" sx={{ maxWidth: "500px", mt: 2, mb: 10 }}>
          We are proud to hear that MedEasy is a company known for providing the
          best quality medicines and supplements in the world. High-quality
          medications and supplements are essential for ensuring the health and
          well-being of individuals. It's important for companies in the
          healthcare industry to prioritize the safety, efficacy, and purity of
          their products to meet the needs and expectations of consumers.
        </Typography>
        <Box
          component="div"
          sx={{
            width: "80%",
            gap: "2rem",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            mb: 5,
          }}
        >
          {arrOfLinks.map((btn) => (
            <Tooltip disableInteractive title={btn.text} key={btn.text}>
              <Button
                onClick={btn.func}
                sx={{
                  width: { xs: "100px", [breakPoint]: "200px" },
                  p: 3,
                  fontSize: "2rem",
                  backgroundColor: COLORS.INVERTEDFROMMAIN,
                }}
                variant="contained"
                color={btn.color}
              >
                {btn.icon}
              </Button>
            </Tooltip>
          ))}
        </Box>
        {cardsArrForHomePage ? (
          <Fragment>
            <Typography component="h4" variant="h4">
              Some of our items:
            </Typography>
            {/* direct container of cards */}
            <Box
              component="div"
              sx={{
                mt: 2,
                mb: 10,
                width: "40vw",
                display: "flex",
                flexDirection: { xs: "column", [breakPoint]: "row" },
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {cardsArrForHomePage.map((card, i) => (
                <Fragment>
                  <Card
                    raised
                    sx={{
                      width: "320px",
                      transition: "all 0.3s ease-in-out",
                      borderRadius: "10px",
                      ":hover": {
                        transform: "scale(1.05)",
                        backgroundColor: COLORS.MAIN,
                      },
                    }}
                  >
                    <CardActionArea>
                      <Typography
                        component="h5"
                        variant="h6"
                        color={COLORS.INVERTEDFROMMAIN}
                      >
                        Click to view item
                      </Typography>
                      <CardHeader
                        sx={{ height: "30px" }}
                        avatar={
                          <Avatar
                            src={logoPic}
                            sx={{ height: "30px", width: "30px" }}
                          />
                        }
                        title={makeTitle(card.title)}
                      />
                      <CardMedia
                        component="img"
                        src={makeALegitStringForImage(card)}
                        alt={card.image.alt || card.title}
                      />
                    </CardActionArea>
                  </Card>
                  {i === cardsArrForHomePage.length - 1 ? (
                    ""
                  ) : (
                    <Divider flexItem sx={{ borderWidth: "0.1rem", m: 2 }} />
                  )}
                </Fragment>
              ))}
            </Box>
          </Fragment>
        ) : (
          ""
        )}
      </Container>
    </Fragment>
  );
};

export default HomePage;
