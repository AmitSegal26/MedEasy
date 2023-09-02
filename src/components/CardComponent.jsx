import React, { useRef } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import RateSpecificProduct from "../pages/specificProduct/RateSpecificProduct";
import COLORS from "../colors/COLORS";
import makeTitle from "../utils/makeATitle";
import makeALegitStringForImage from "../utils/makeALegitStringForImage";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PreviewIcon from "@mui/icons-material/Preview";
const CardComponent = ({
  cardProp,
  payloadProp,
  handleCardClickFunc,
  handleAddToCartClickFunc,
  handleDeleteClickBeforeConfirmFunc,
  handleEditClickFunc,
}) => {
  const buttonElement = useRef();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          backgroundColor: COLORS.SECONDARY,
          border: "0.05rem solid black",
          height: {
            xs: payloadProp && payloadProp.isAdmin ? "730px" : "635px",
            lg: "650px",
          },
          p: 2,
        }}
      >
        <CardHeader
          title={makeTitle(
            cardProp.title && cardProp.title.length <= 21
              ? cardProp.title
              : cardProp.title.slice(0, 21 - cardProp.title.length) + "..."
          )}
        />
        <CardActionArea>
          <CardMedia
            id={cardProp._id}
            sx={{ borderRadius: 1 }}
            component="img"
            height="250"
            alt={cardProp.image.alt || "Default Image Of Meds"}
            image={makeALegitStringForImage(cardProp)}
            onClick={handleCardClickFunc}
          />
        </CardActionArea>
        <CardContent
          sx={{
            height: "85px",
            marginBlock: 3,
          }}
        >
          <Typography component="h6">
            {cardProp.stock ? `Stock: ${cardProp.stock}` : "out of stock!"}
          </Typography>
          <Typography component="h6">$ {cardProp.price}</Typography>
        </CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {cardProp &&
            cardProp.rating &&
            cardProp.rating.ratingUsers &&
            cardProp.rating.hasOwnProperty("ratingTotalScore") ? (
              cardProp.rating.ratingTotalScore == 0 ? (
                <RateSpecificProduct
                  forShopPage={true}
                  payloadProp={payloadProp}
                  numOfStarsProp={0}
                />
              ) : (
                <RateSpecificProduct
                  forShopPage={true}
                  payloadProp={payloadProp}
                  numOfStarsProp={Math.floor(
                    cardProp.rating.ratingTotalScore /
                      cardProp.rating.ratingUsers.length
                  )}
                />
              )
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={6} lg={payloadProp && payloadProp.isAdmin ? 3 : 6}>
            <Tooltip
              enterDelay={500}
              title={
                cardProp && cardProp.stock ? "add item to cart" : "out of stock"
              }
            >
              <Box component="span">
                <IconButton
                  id={cardProp.title + "||" + cardProp._id}
                  sx={{ p: 1, m: 1 }}
                  variant="contained"
                  color="success"
                  disabled={
                    cardProp &&
                    cardProp.stock == 0 &&
                    payloadProp &&
                    !cardProp.cart.includes(payloadProp._id)
                  }
                  onClick={handleAddToCartClickFunc}
                >
                  {payloadProp &&
                  cardProp &&
                  cardProp.cart.includes(payloadProp._id) ? (
                    <RemoveShoppingCartIcon
                      id={cardProp.title + "||" + cardProp._id}
                      sx={{
                        fontSize: "2.5rem",
                      }}
                    />
                  ) : (
                    <AddShoppingCartIcon
                      id={cardProp.title + "||" + cardProp._id}
                      sx={{
                        fontSize: "2.5rem",
                      }}
                    />
                  )}
                </IconButton>
              </Box>
            </Tooltip>
          </Grid>
          {payloadProp && payloadProp.isAdmin ? (
            <Grid item xs={6} lg={3}>
              <Tooltip id={cardProp._id} enterDelay={500} title="delete item">
                <IconButton
                  id={cardProp._id}
                  onClick={handleDeleteClickBeforeConfirmFunc}
                  sx={{ p: 1, m: 1 }}
                  variant="contained"
                  color="error"
                >
                  <DeleteForeverIcon
                    id={cardProp._id}
                    sx={{
                      fontSize: "2.5rem",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
          ) : (
            ""
          )}
          <Grid item xs={6} lg={payloadProp && payloadProp.isAdmin ? 3 : 6}>
            <Tooltip enterDelay={500} title="read more">
              <IconButton
                ref={buttonElement}
                variant="contained"
                color="info"
                onClick={handleCardClickFunc}
                id={cardProp._id}
                sx={{
                  p: 1,
                  m: 1,
                }}
              >
                <PreviewIcon
                  id={cardProp._id}
                  sx={{
                    fontSize: "2.5rem",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Grid>
          {payloadProp && payloadProp.isAdmin ? (
            <Grid item xs={6} lg={3}>
              <Tooltip id={cardProp._id} enterDelay={500} title="edit item">
                <IconButton
                  id={cardProp._id}
                  onClick={handleEditClickFunc}
                  sx={{ p: 1, m: 1 }}
                  variant="contained"
                  color="warning"
                >
                  <EditNoteIcon
                    id={cardProp._id}
                    sx={{
                      fontSize: "2.5rem",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </Card>
    </Grid>
  );
};

export default CardComponent;
