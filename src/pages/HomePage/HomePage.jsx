import React, { Fragment, useEffect, useState } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import SearchPartial from "../../components/Navbar/SearchPartial";
import CardHomeComponent from "./CardHomeComponent";
import ButtonsOfHomePage from "./ButtonsOfHomePage";
// axios
import axios from "axios";
//css
import "./homePage.css";

const HomePage = () => {
  const [cardsArrForHomePage, setCardsArrForHomePage] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(
          "http://localhost:8181/api/cards/allCards"
        );
        if (data.length >= 3) {
          data.length = 3;
        }
        setCardsArrForHomePage(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const breakPoint = "md";
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
        <Typography
          variant="h6"
          sx={{ maxWidth: "500px", mt: 2, mb: 10, p: 2 }}
        >
          We are proud to hear that MedEasy is a company known for providing the
          best quality medicines and supplements in the world. High-quality
          medications and supplements are essential for ensuring the health and
          well-being of individuals. It's important for companies in the
          healthcare industry to prioritize the safety, efficacy, and purity of
          their products to meet the needs and expectations of consumers.
        </Typography>
        {/* Buttons of pages for home page */}
        <ButtonsOfHomePage breakPointProp={breakPoint} />
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
                width: "70vw",
                display: "flex",
                flexDirection: { xs: "column", [breakPoint]: "row" },
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {cardsArrForHomePage.map((card, i) => (
                <CardHomeComponent
                  cardProp={card}
                  index={i}
                  cardsArrForHomePageProp={cardsArrForHomePage}
                />
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
