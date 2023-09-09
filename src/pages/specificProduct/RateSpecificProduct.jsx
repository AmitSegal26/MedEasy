import React, { Fragment } from "react";
import { Box, Container, Tooltip, Typography, Zoom } from "@mui/material";
import fullStar from "../../assets/imgs/fullStar.png";
import emptyStar from "../../assets/imgs/emptyStar.png";
import OfflinePinRoundedIcon from "@mui/icons-material/OfflinePinRounded";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import COLORS from "../../colors/COLORS";
//css
import "./specificProduct.css";
const RateSpecificProduct = ({
  alreadyRatedProp,
  numOfStarsProp,
  payloadProp,
  forShopPage,
  starClickFunc,
}) => {
  const navigate = useNavigate();
  if (numOfStarsProp > 5) {
    return (
      <Container component="div">
        <Typography component="h3" variant="h5">
          Problem Loading Rating
        </Typography>
      </Container>
    );
  }
  const arrOfFilledStars = new Array(numOfStarsProp);
  for (let i = 0; i < arrOfFilledStars.length; i++) {
    arrOfFilledStars[i] = i;
  }
  const arrOfEmptyStars = new Array(5 - numOfStarsProp);
  if (arrOfEmptyStars.length != 0) {
    for (let i = arrOfEmptyStars.length; i > 0; i--) {
      arrOfEmptyStars[5 - i] = 6 - i;
    }
  }

  const handleMouseHover = (ev) => {
    if (alreadyRatedProp || !payloadProp || forShopPage) {
      return;
    }
    let { id } = ev.target;
    if (!id) {
      return;
    }
    for (let i = 1; i <= 5; i++) {
      document.getElementById(i).src = emptyStar;
    }
    const tempArrOfFilledStars = new Array(+id);
    for (let i = 0; i < tempArrOfFilledStars.length; i++) {
      document.getElementById(i + 1).src = fullStar;
    }
  };
  const handleMouseLeave = () => {
    if (alreadyRatedProp || !payloadProp || forShopPage) {
      return;
    }
    for (let i = 1; i <= 5; i++) {
      document.getElementById(i).src = emptyStar;
    }
    for (let i = 0; i < arrOfFilledStars.length; i++) {
      document.getElementById(i + 1).src = fullStar;
    }
  };
  const handleStarClickk = (ev) => {
    starClickFunc(ev);
  };

  const isArrowTooltipDisplayed = () =>
    payloadProp && !alreadyRatedProp ? true : false;

  const clickCheck = () => {
    navigate(ROUTES.LOGIN);
  };
  const isArrowTooltipDisplayedOnShopPage = forShopPage
    ? false
    : !payloadProp || alreadyRatedProp
    ? true
    : false;
  let counter = 1;
  const counterUpForStar = () => {
    return counter++;
  };
  return (
    <Container
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip
        title={
          alreadyRatedProp ? (
            "already rated this item"
          ) : !payloadProp ? (
            <Fragment>
              <span
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: COLORS.MAIN,
                }}
                onClick={clickCheck}
              >
                login
              </span>{" "}
              in order to rate this item
            </Fragment>
          ) : (
            ""
          )
        }
        enterDelay={300}
        disableHoverListener={isArrowTooltipDisplayedOnShopPage ? false : true}
      >
        <Box
          component="span"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography component="h3" variant="h6">
            Our Users Rated{" "}
            {!alreadyRatedProp || forShopPage ? "" : " (including you)"}:
          </Typography>
          <Box component="div">
            {arrOfFilledStars.map((i) => (
              <Tooltip
                TransitionComponent={Zoom}
                disableHoverListener={alreadyRatedProp || !payloadProp}
                arrow={isArrowTooltipDisplayed ? true : false}
                title={
                  alreadyRatedProp
                    ? "already rated"
                    : !payloadProp
                    ? "login to rate"
                    : `rate ${i + 1}`
                }
                key={"starFill" + i + Date.now()}
              >
                <img
                  src={fullStar}
                  style={{ width: "5%" }}
                  id={counterUpForStar()}
                  className={
                    alreadyRatedProp || !payloadProp ? "" : "star-to-choose"
                  }
                  alt="full star of rate"
                  onMouseEnter={handleMouseHover}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleStarClickk}
                />
              </Tooltip>
            ))}
            {arrOfEmptyStars.map((i) => (
              <Tooltip
                TransitionComponent={Zoom}
                disableHoverListener={alreadyRatedProp || !payloadProp}
                arrow={isArrowTooltipDisplayed ? true : false}
                title={`rate ${i}`}
                key={"starEmpty" + i}
              >
                <img
                  src={emptyStar}
                  style={{ width: "5%" }}
                  id={counterUpForStar()}
                  className={
                    alreadyRatedProp || !payloadProp ? "" : "star-to-choose"
                  }
                  alt="empty star of rate"
                  onMouseEnter={handleMouseHover}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleStarClickk}
                />
              </Tooltip>
            ))}
          </Box>

          {!alreadyRatedProp || forShopPage ? (
            ""
          ) : (
            <Typography
              component="h4"
              variant="h6"
              sx={{
                alignItems: "center",
                alignSelf: "center",
                display: "flex",
                fontWeight: "bolder",
              }}
            >
              You Have Rated This Product
              <OfflinePinRoundedIcon sx={{ color: "green" }} />
            </Typography>
          )}
        </Box>
      </Tooltip>
    </Container>
  );
};

RateSpecificProduct.defaultProps = {
  alreadyRatedProp: true,
  numOfStarsProp: 0,
  forShopPage: false,
  starClickFunc: () => {},
};

export default RateSpecificProduct;
