import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import validateIdSchema from "../../validations/idValidate";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import makeALegitStringForImage from "../../utils/makeALegitStringForImage";
import makeTitle from "../../utils/makeATitle";
import COLORS from "../../colors/COLORS";
import RateSpecificProduct from "./RateSpecificProduct";
import { useSelector } from "react-redux";
import useTitle from "../../hooks/useTitle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SpecificProductPage = () => {
  const { id } = useParams();
  const title = useTitle();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState(null);
  const [numOfStars, setNumOfStars] = useState(0);
  const [hasRatedAlready, setHasRatedAlready] = useState(false);
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  useEffect(() => {
    if (validateIdSchema(id)) {
      toast.error("something went wrong, try again later");
      navigate(ROUTES.HOME);
    }
    (async () => {
      try {
        let { data } = await axios.get(
          `http://localhost:8181/api/cards/card/${id}`
        );
        delete data.__v;
        delete data.user_id;
        if (!data) {
          toast.warning(
            "not possible to load the information right now, try again later!"
          );
          navigate(ROUTES.HOME);
        }
        title(makeTitle(data.title));
        if (
          data.rating &&
          data.rating.ratingUsers &&
          data.rating.ratingTotalScore
        ) {
          for (const idOfUser of data.rating.ratingUsers) {
            if (payload && idOfUser == payload._id) {
              setHasRatedAlready(true);
              break;
            }
          }
          let rateStr = 0;
          const rateScore = Math.floor(
            data.rating.ratingTotalScore / data.rating.ratingUsers.length
          );
          for (let i = 0; i < rateScore; i++) {
            rateStr += 1;
          }
          setNumOfStars(rateStr);
        }
        setCardData(data);
      } catch (err) {
        if (err && err.response && err.response.data) {
          if (err.response.data.msg == "no card found") {
            toast.warning(
              "not possible to load the information right now, try again later!"
            );
            navigate(ROUTES.HOME);
          } else {
            toast.error(err.response.data.msg);
          }
        }
      }
    })();
    if (cardData && cardData.rating && cardData.rating.ratingUsers && payload) {
      for (const idOfUser of cardData.rating.ratingUsers) {
        if (payload && idOfUser == payload._id) {
          setHasRatedAlready(true);
          break;
        }
      }
      let rateStr = 0;
      const rateScore = Math.floor(
        cardData.rating.ratingTotalScore / cardData.rating.ratingUsers.length
      );
      for (let i = 0; i < rateScore; i++) {
        rateStr += 1;
      }
      setNumOfStars(rateStr);
    }
  }, []);
  const handleStarClick = async (ev) => {
    try {
      if (!cardData || !payload || hasRatedAlready) {
        return;
      }
      let { id } = ev.target;
      if (!id) {
        throw new Error("Error Rating");
      }
      let { data } = await axios.patch(
        `http://localhost:8181/api/cards/rate/${cardData._id}`,
        {
          score: +id,
        }
      );
      let newCardData = JSON.parse(JSON.stringify(cardData));
      newCardData.rating = {
        ratingUsers: [...newCardData.rating.ratingUsers, payload._id],
        ratingTotalScore: newCardData.rating.ratingTotalScore + +id,
      };
      if (data && data.rating) {
        const rateScore = Math.floor(
          data.rating.ratingTotalScore / data.rating.ratingUsers.length
        );
        setNumOfStars(rateScore);
      }
      setCardData(newCardData);
      setHasRatedAlready(true);
      toast.success("");
    } catch (err) {
      if (err && err.response && err.response.data && err.response.data.msg) {
        toast.error(err.response.data.msg);
      } else {
        toast.error(err.response.data);
      }
    }
  };
  if (!cardData) {
    return <CircularProgress />;
  }
  return (
    <Container
      maxWidth="lg"
      component={Paper}
      sx={{
        border: `0.2rem solid ${COLORS.INVERTEDFROMMAIN}`,
      }}
    >
      <Grid container maxWidth="lg" sx={{ m: 5 }}>
        {" "}
        <Grid item xs={1}>
          <Button
            onClick={() => {
              navigate(ROUTES.SHOP);
            }}
            color="error"
            variant="contained"
            sx={{ m: 1 }}
          >
            <ArrowBackIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component="h2"
            variant="h4"
            sx={{
              paddingTop: "2rem",
              marginBottom: "3rem",
              display: "inline-block",
            }}
          >
            {makeTitle(cardData.title)}
          </Typography>
          <Typography
            component="p"
            sx={{
              display: "block",
              fontSize: "1.2rem",
              textAlign: "center",
              fontWeight: "bolder",
              margin: 3,
            }}
          >
            {makeTitle(cardData.description)}
          </Typography>
          <RateSpecificProduct
            idOfCard={cardData && cardData._id}
            numOfStarsProp={numOfStars}
            alreadyRatedProp={hasRatedAlready}
            starClickFunc={handleStarClick}
            payloadProp={payload}
          />
          <Grid item xs={12}>
            <img
              src={makeALegitStringForImage(cardData)}
              alt={cardData.title}
              style={{
                borderRadius: "5px",
                width: "50%",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Typography component="h4" variant="h6">
            Each Pack Contains: {cardData && cardData.contains}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography component="h4" variant="h6">
            {cardData && cardData.stock} Left In Stock
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography component="h4" variant="h6">
            ${cardData && cardData.price}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SpecificProductPage;
