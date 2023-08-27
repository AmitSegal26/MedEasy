import React from "react";
import makeALegitStringForImage from "../utils/makeALegitStringForImage";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  Box,
  ListItem,
  ListItemIcon,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import COLORS from "../colors/COLORS";

const ListComponent = ({
  cardProp,
  payloadProp,
  handleCartBtnClickFunc,
  handleDeleteFromInitialCardsArrFunc,
  handleEditFromInitialCardsArrFunc,
  handleImageToShowDataFunc,
}) => {
  const mediaQ = useMediaQuery("(max-width:935px)");
  const styleObjForButtons = {
    cursor: "pointer",
    fontSize: "2rem",
    transition: "all 0.2s ease-in-out",
    ":hover": {
      transform: "scale(1.2)",
    },
  };
  const isPossibleCart =
    cardProp &&
    cardProp.stock == 0 &&
    payloadProp &&
    !cardProp.cart.includes(payloadProp._id);
  const handleCartBtnClick = (ev) => {
    handleCartBtnClickFunc(ev);
  };
  const handleEditFromInitialCardsArr = (ev) => {
    handleEditFromInitialCardsArrFunc(ev);
  };
  const handleClickToShowData = (ev) => {
    handleImageToShowDataFunc(ev);
  };
  const handleDeleteFromInitialCardsArr = (ev) => {
    handleDeleteFromInitialCardsArrFunc(ev);
  };
  if (!cardProp) {
    return "";
  }
  return (
    <ListItem
      disablePadding
      key={cardProp._id + Date.now()}
      sx={{
        height: mediaQ ? "200px" : "",
        p: 1,
        marginBlock: 1,
        justifyContent: "space-between",
        borderRadius: "10px",
        flexWrap: mediaQ ? "wrap" : "no-wrap",
        transition: "all 0.2s cubic-bezier(0.12,0.8,1,0.6)",
        ":hover": {
          backgroundColor: COLORS.SECONDARY,
        },
      }}
    >
      <Box
        component="span"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          id={cardProp._id}
          component="img"
          sx={{
            width: 70,
            height: 70,
            mr: 2,
            borderRadius: "10px",
            cursor: "pointer",
          }}
          src={makeALegitStringForImage(cardProp)}
          onClick={handleClickToShowData}
        />
        <Typography
          component="h4"
          variant="h6"
          sx={{
            marginLeft: 4,
            width: mediaQ ? "10ch" : "25ch",
            overflow: "hidden",
          }}
        >
          {mediaQ
            ? cardProp.title && cardProp.title.length <= 7
              ? cardProp.title
              : cardProp.title.slice(0, 7 - cardProp.title.length) + "..."
            : cardProp.title && cardProp.title.length <= 21
            ? cardProp.title
            : cardProp.title.slice(0, 21 - cardProp.title.length) + "..."}
        </Typography>
        <Typography component="h4" variant="h6" color={COLORS.TEXT1}>
          ${cardProp.price}
        </Typography>
        <Typography
          component="h4"
          variant="h6"
          color={COLORS.TEXT2}
          sx={{ marginLeft: 4 }}
        >
          {cardProp && cardProp.hasOwnProperty("stock")
            ? cardProp.stock == 0
              ? "Out of stock"
              : cardProp.stock + " Left"
            : ""}
        </Typography>
      </Box>
      <Box
        component="span"
        sx={{ display: "flex", alignItems: "center", mr: 8 }}
      >
        {payloadProp &&
        cardProp &&
        cardProp.hasOwnProperty("cart") &&
        cardProp.cart.includes(payloadProp._id) ? (
          <ListItemIcon>
            <RemoveShoppingCartOutlinedIcon
              id={cardProp.title + "||" + cardProp._id}
              onClick={isPossibleCart ? null : handleCartBtnClick}
              sx={
                isPossibleCart
                  ? {
                      ...styleObjForButtons,
                      color: COLORS.TEXT2,
                      cursor: "default",
                      ":hover": "none",
                    }
                  : {
                      ...styleObjForButtons,
                    }
              }
              color="success"
            />
          </ListItemIcon>
        ) : (
          <ListItemIcon>
            <Tooltip
              title="out of stock"
              disableHoverListener={!isPossibleCart}
            >
              <AddShoppingCartOutlinedIcon
                id={cardProp.title + "||" + cardProp._id}
                onClick={isPossibleCart ? null : handleCartBtnClick}
                sx={
                  isPossibleCart
                    ? {
                        ...styleObjForButtons,
                        color: COLORS.TEXT2,
                        cursor: "default",
                        ":hover": "none",
                      }
                    : {
                        ...styleObjForButtons,
                      }
                }
                color="success"
              />
            </Tooltip>
          </ListItemIcon>
        )}
        {payloadProp && payloadProp.isAdmin ? (
          <>
            <ListItemIcon>
              <EditNoteIcon
                id={cardProp._id}
                onClick={handleEditFromInitialCardsArr}
                sx={styleObjForButtons}
                color="warning"
              />
            </ListItemIcon>
            <ListItemIcon>
              <DeleteIcon
                id={cardProp._id}
                onClick={handleDeleteFromInitialCardsArr}
                sx={styleObjForButtons}
                color="error"
              />
            </ListItemIcon>
          </>
        ) : (
          ""
        )}
        <ListItemIcon>
          <VisibilityOutlinedIcon
            id={cardProp._id}
            onClick={handleClickToShowData}
            sx={styleObjForButtons}
            color="primary"
          />
        </ListItemIcon>
      </Box>
    </ListItem>
  );
};

export default ListComponent;
