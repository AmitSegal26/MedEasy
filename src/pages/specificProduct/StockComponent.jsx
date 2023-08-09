import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import COLORS from "../../colors/COLORS";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import makeTitle from "../../utils/makeATitle";
import axios from "axios";

const StockComponent = ({ cardDataProp, payloadProp }) => {
  const navigate = useNavigate();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [cardState, setCardState] = useState(cardDataProp);
  const [chosenIndexRowColor, setChosenIndexRowColor] = useState(0);
  const [chosenIndexColumnSizes, setChosenIndexColumnSizes] = useState(0);
  const [isInCart, setIsInCart] = useState([]);

  useEffect(() => {
    console.log("first call");
    if (!payloadProp || !cardDataProp) {
      return;
    }
    if (!cardState) {
      return;
    }
    console.log("second call objects exist");

    let { stock } = cardState;
    console.log(stock[chosenIndexRowColor][chosenIndexColumnSizes].cart);
    for (
      let i = 0;
      i < stock[chosenIndexRowColor][chosenIndexColumnSizes].cart.length;
      i++
    ) {
      if (
        payloadProp._id ==
        stock[chosenIndexRowColor][chosenIndexColumnSizes].cart[i]
      ) {
        if (isInCart.length == 0) {
          setIsInCart([
            {
              row: chosenIndexRowColor,
              column: chosenIndexColumnSizes,
              value: true,
            },
          ]);
          return;
        }
        if (
          isInCart.find(
            (indic) =>
              indic &&
              indic.row == chosenIndexRowColor &&
              indic.column == chosenIndexColumnSizes &&
              indic.value
          )
        ) {
          let newIsInCart = JSON.parse(JSON.stringify(isInCart));
          newIsInCart[i].value = false;
          setIsInCart(newIsInCart);
        }
        setIsInCart([
          ...isInCart,
          {
            row: chosenIndexRowColor,
            column: chosenIndexColumnSizes,
            value: true,
          },
        ]);
        break;
      }
    }
  }, [chosenIndexRowColor, chosenIndexColumnSizes, cardState]);
  useEffect(() => {
    console.log("isInCart", isInCart);
  }, [isInCart]);
  let { stock } = cardState;
  let colorsArr = [];
  for (let i = 0; i < stock.length; i++) {
    colorsArr = [...colorsArr, stock[i][0].color];
  }
  const findColor = (arrRow) => {
    return arrRow[0].color;
  };
  const handleClickOfColor = (ev) => {
    for (let i = 0; i < stock.length; i++) {
      if (stock[i][0].color == ev.target.id) {
        //*find which row in the "table" contains the color
        //? show data about that row (sizes) - then continue with the final info (price, stock)
        setChosenIndexRowColor(i);
        break;
      }
    }
  };
  const handleClickOfSize = (ev) => {
    for (let i = 0; i < stock[chosenIndexRowColor].length; i++) {
      if (
        `${stock[chosenIndexRowColor][i].size.height}+${stock[chosenIndexRowColor][i].size.width}+${stock[chosenIndexRowColor][i].size.length}` ===
        ev.target.id
      ) {
        setChosenIndexColumnSizes(i);
        break;
      }
    }
  };
  const isActiveSize = (obj) => {
    if (
      obj.size.height ==
        stock[chosenIndexRowColor][chosenIndexColumnSizes].size.height &&
      obj.size.width ==
        stock[chosenIndexRowColor][chosenIndexColumnSizes].size.width &&
      obj.size.length ==
        stock[chosenIndexRowColor][chosenIndexColumnSizes].size.length
    ) {
      return `0.3rem solid ${COLORS.INVERTEDFROMMAIN}`;
    } else {
      return "none";
    }
  };
  const handleBuyClick = async () => {
    try {
      if (!payloadProp) {
        toast.warning(
          `Before adding '${makeTitle(
            cardState.title
          )}' to your cart, you should login to your account!`
        );
        navigate(ROUTES.LOGIN);
      }
      setOpenBackdrop(true);
      let {
        data: { data },
        data: { addedToCart },
      } = await axios.patch(
        "http://localhost:8181/api/cards/cart/" + cardState._id,
        { rowIndex: chosenIndexRowColor, columnIndex: chosenIndexColumnSizes }
      );

      if (data) {
        let newCardState = JSON.parse(JSON.stringify(cardState));
        newCardState = { ...data };
        setCardState(newCardState);
      }
      setOpenBackdrop(false);
      addedToCart
        ? toast.success(
            `${makeTitle(cardState.title)} has been added to your cart!`
          )
        : toast.warning(
            `${makeTitle(cardState.title)} has been removed from your cart!`
          );
    } catch (err) {
      setOpenBackdrop(false);
      if (err && err.response && err.response.data && err.response.data.msg) {
        if (err.response.data.msg == "please provide token") {
          return;
        } else {
          toast.error(err.response.data.msg);
        }
      } else {
        toast.error("something went wrong, try again later");
      }
    }
  };
  if (!cardState) {
    return <CircularProgress />;
  }
  return (
    <Box component={Paper} sx={{ padding: "1rem" }}>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "column",
        }}
        open={openBackdrop}
      >
        <Typography component="h4" variant="h5">
          This might take a while, thank you for your patience
        </Typography>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box>
        {colorsArr.map((color) => (
          <Box
            key={color}
            component="button"
            sx={{
              backgroundColor: color,
              borderRadius: 3,
              border: 0,
              width: "2rem",
              height: "2rem",
              margin: "0.4rem",
              cursor: "pointer",
              ":hover": { border: `0.2rem solid ${COLORS.INVERTEDFROMMAIN}` },
            }}
            id={color}
            onClick={handleClickOfColor}
          />
        ))}
        <Box
          component="div"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexBasis: "3",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {stock[chosenIndexRowColor].map((cell) => (
            <Box
              key={
                cell.size.height +
                cell.size.width +
                cell.size.length +
                Date.now()
              }
              sx={{
                backgroundColor: findColor(stock[chosenIndexRowColor]),
                borderRadius: 3,
                border: isActiveSize(cell),
                margin: "0.4rem",
                padding: "1rem",
                width: "120px",
                cursor: "pointer",

                boxSizing: "border-box",
                ":hover": {
                  outline:
                    isActiveSize(cell) != "none"
                      ? null
                      : `0.2rem dashed ${COLORS.MAIN}`,
                },
              }}
              id={`${cell.size.height}+${cell.size.width}+${cell.size.length}`}
              onClick={handleClickOfSize}
            >
              <Typography
                component="h6"
                id={`${cell.size.height}+${cell.size.width}+${cell.size.length}`}
                onClick={handleClickOfSize}
              >
                <Box
                  id={`${cell.size.height}+${cell.size.width}+${cell.size.length}`}
                  onClick={handleClickOfSize}
                  component="span"
                  sx={{ fontWeight: "bold" }}
                >
                  height:{" "}
                </Box>
                <Box
                  id={`${cell.size.height}+${cell.size.width}+${cell.size.length}`}
                  onClick={handleClickOfSize}
                  component="span"
                  sx={{ color: COLORS.INVERTEDFROMMAIN, fontWeight: "bolder" }}
                >
                  {cell.size.height}cm
                </Box>
              </Typography>
              <Typography
                component="h6"
                id={`${cell.size.height}+${cell.size.width}+${cell.size.length}`}
              >
                <Box
                  id={`${cell.size.height}+${cell.size.width}+${cell.size.length}`}
                  onClick={handleClickOfSize}
                  component="span"
                  sx={{ fontWeight: "bold" }}
                >
                  width:{" "}
                </Box>
                <Box
                  id={`${cell.size.height}+${cell.size.width}+${cell.size.length}`}
                  onClick={handleClickOfSize}
                  component="span"
                  sx={{ color: COLORS.INVERTEDFROMMAIN, fontWeight: "bolder" }}
                >
                  {cell.size.width}cm
                </Box>
              </Typography>
              <Typography component="h6" onClick={handleClickOfSize}>
                <Box
                  id={`${cell.size.height}+${cell.size.width}+${cell.size.length}`}
                  onClick={handleClickOfSize}
                  component="span"
                  sx={{ fontWeight: "bold" }}
                >
                  length:{" "}
                </Box>
                <Box
                  id={`${cell.size.height}+${cell.size.width}+${cell.size.length}`}
                  onClick={handleClickOfSize}
                  component="span"
                  sx={{ color: COLORS.INVERTEDFROMMAIN, fontWeight: "bolder" }}
                >
                  {cell.size.length}cm
                </Box>
              </Typography>
            </Box>
          ))}
          <Box
            component="div"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5rem",
                mt: 2,
                color: "#5399A6",
                fontWeight: "bold",
                backgroundColor: COLORS.TEXT1,
                padding: 1,
                borderRadius: "10px",
              }}
            >
              Stock:{" "}
              {stock[chosenIndexRowColor][chosenIndexColumnSizes].stock != 0
                ? stock[chosenIndexRowColor][chosenIndexColumnSizes].stock
                : "NONE LEFT"}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.5rem",
                mt: 2,
                color: "#0a1",
                fontWeight: "bold",
                backgroundColor: COLORS.SECONDARY,
                padding: 1,
                borderRadius: "10px",
              }}
            >
              Price:{" "}
              {stock[chosenIndexRowColor][chosenIndexColumnSizes].price != 0
                ? `$${stock[chosenIndexRowColor][chosenIndexColumnSizes].price}`
                : "Free of charge"}
            </Typography>
            <Button
              color="success"
              variant="contained"
              sx={{
                flexBasis: "150px",
                fontSize: "1rem",
                mt: 2,
                color: "#0a1",
                fontWeight: "bold",
                backgroundColor: COLORS.INVERTEDFROMMAIN,
                padding: 1,
                borderRadius: "10px",
              }}
              onClick={handleBuyClick}
            >
              {isInCart
                ? isInCart.find(
                    (indic) =>
                      indic.column == chosenIndexColumnSizes &&
                      indic.row == chosenIndexRowColor
                  )
                  ? "add"
                  : "remove"
                : "remove"}{" "}
              this version of item to your cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StockComponent;
