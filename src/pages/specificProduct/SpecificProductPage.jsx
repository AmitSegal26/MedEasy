import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import validateIdSchema from "../../validations/idValidate";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import {
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import makeALegitStringForImage from "../../utils/makeALegitStringForImage";
import makeTitle from "../../utils/makeATitle";
import COLORS from "../../colors/COLORS";
import RateSpecificProduct from "./RateSpecificProduct";
import { useSelector } from "react-redux";
import useTitle from "../../hooks/useTitle";
import handleErrorFromAxios from "../../utils/handleError";
import dollarIcon from "../../assets/icons/dollarSvg.svg";
import BuyNowPopup from "../../components/BuyNowPopup";
import "./specificProduct.css";
import BackArrowButtonComp from "../../components/BackArrowButtonComp";
const SpecificProductPage = () => {
  const { id } = useParams();
  const title = useTitle();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState(null);
  const [openBuyNowPopup, setOpenBuyNowPopup] = useState(false);
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
        handleErrorFromAxios(
          err,
          "not possible to load the information right now, try again later!",
          false
        );
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
      if (!ev) {
        return;
      }
      if (ev && !ev.target) {
        return;
      }
      if (ev && ev.target && !ev.target.id) {
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
      toast.info("rated successfully, thank you for your review!");
    } catch (err) {
      handleErrorFromAxios(
        err,
        "cannot rate right now, we are truly sorry for the inconvinence!",
        false
      );
    }
  };
  const handleDollarClick = () => {
    setOpenBuyNowPopup(true);
  };
  const styleOfDetailsGrid = {
    marginBlock: "0.5rem",
    backgroundColor: "#ff80ff",
    borderRadius: "30px",
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
      <BuyNowPopup
        openStateProp={openBuyNowPopup}
        setOpenFunc={setOpenBuyNowPopup}
        title={`${makeTitle(
          cardData && cardData.title ? cardData.title : "this item"
        )}`}
      />
      <Grid container maxWidth="lg" sx={{ m: 5 }}>
        <Grid item xs={4} sm={3} md={2} lg={1}>
          <BackArrowButtonComp route={ROUTES.SHOP} />
        </Grid>
        <Grid item xs={9} sm={10} md={11} lg={12}>
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
        </Grid>
      </Grid>

      <Grid container>
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
        <Grid item xs={2} md={4.5} />
        <Grid item xs={8} md={3} style={styleOfDetailsGrid}>
          <Typography component="h4" variant="h6">
            ${cardData && cardData.price}
          </Typography>
          <Tooltip title={`Buy '${cardData && cardData.title}'`}>
            <IconButton
              variant="contained"
              color="info"
              onClick={handleDollarClick}
              id={""}
              sx={{
                aspectRatio: "1/1",
                width: "3em",
                p: 1,
                m: 1,
              }}
            >
              <img id="dollar-icon" src={dollarIcon} alt="buy button" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={2} md={4.5} />
        <Grid item xs={2} md={4.5} />
        <Grid item xs={8} md={3} style={styleOfDetailsGrid}>
          <Typography component="h4" variant="h6">
            Each Pack Contains: {cardData && cardData.contains}
          </Typography>
        </Grid>
        <Grid item xs={2} md={4.5} />
        <Grid item xs={2} md={4.5} />
        <Grid item xs={8} md={3} style={styleOfDetailsGrid}>
          <Typography component="h4" variant="h6">
            {cardData && cardData.stock} Left In Stock
          </Typography>
        </Grid>
        <Grid item xs={2} md={4.5} />
      </Grid>
    </Container>
  );
};

export default SpecificProductPage;
