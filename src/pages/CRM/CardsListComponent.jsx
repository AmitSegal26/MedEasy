import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import makeALegitStringForImage from "../../utils/makeALegitStringForImage";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import useReadCard from "../../hooks/useReadCard";
import useEditCard from "../../hooks/useEditCard";
import COLORS from "../../colors/COLORS";
const CardsListComponent = ({
  cardsArrProp,
  typesOfDialogObjProp,
  setDialogItemStateFunc,
  setTypeOfDialogFunc,
  setOpenDialogStateFunc,
}) => {
  const readCard = useReadCard();
  const editCard = useEditCard();
  const styleObjForGridItems = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const handleShowMoreClick = (ev) => {
    readCard(ev);
  };
  const handleEditClick = (ev) => {
    editCard(ev);
  };
  const handleDeleteClick = (ev) => {
    if (!ev) {
      return;
    }
    if (!ev.target) {
      return;
    }
    if (!ev.target.id) {
      return;
    }
    let [idOfItem] = ev.target.id.split("|");
    for (let card of cardsArrProp) {
      if (card._id == idOfItem) {
        setDialogItemStateFunc({
          idOfItem: ev.target.id,
          nameOfItem: card.title,
        });
        setTypeOfDialogFunc(typesOfDialogObjProp.deleteCard);
        setOpenDialogStateFunc(true);
        break;
      }
    }
  };
  if (!cardsArrProp) {
    return;
  }
  if (!cardsArrProp.length) {
    return;
  }
  return (
    <Container maxWidth="lg">
      <Typography gutterBottom component="h4" variant="h5">
        Number of cards on this site: {cardsArrProp.length}
      </Typography>
      <Grid container>
        {cardsArrProp.map((card) => (
          <Grid
            component={Paper}
            sx={{
              m: 0.5,
              p: 1,
              transition: "all 0.3s ease-in-out",
              ":hover": { transform: "scale(1.05)" },
            }}
            key={card._id}
            item
            xs={12}
          >
            <Grid container>
              <Grid item xs={4} md={2} sx={styleObjForGridItems}>
                {card.title}
              </Grid>
              <Grid
                item
                xs={4}
                md={2}
                sx={{
                  ...styleObjForGridItems,
                  color: card.stock ? "" : "red",
                  fontWeight: card.stock ? "" : "bold",
                }}
              >
                {card.stock ? `stock: ${card.stock}` : "Out Of Stock!"}
              </Grid>
              <Grid item xs={4} md={2} sx={styleObjForGridItems}>
                <Box
                  component="img"
                  src={makeALegitStringForImage(card)}
                  alt={card.image.alt}
                  sx={{ width: "40%" }}
                />
              </Grid>
              <Grid item xs={4} md={2} sx={styleObjForGridItems}>
                <Tooltip
                  title={
                    <Fragment>
                      click to{" "}
                      <span
                        style={{
                          color: COLORS.INVERTEDFROMMAIN,
                          fontWeight: "bold",
                        }}
                      >
                        view info
                      </span>{" "}
                      of card
                    </Fragment>
                  }
                >
                  <IconButton id={card._id} onClick={handleShowMoreClick}>
                    <OpenInFullIcon id={card._id} color="primary" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={4} md={2} sx={styleObjForGridItems}>
                <Tooltip
                  title={
                    <Fragment>
                      click to <span style={{ color: "gold" }}>edit</span> card
                    </Fragment>
                  }
                >
                  <IconButton id={card._id} onClick={handleEditClick}>
                    <EditIcon id={card._id} color="warning" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={4} md={2} sx={styleObjForGridItems}>
                <Tooltip
                  title={
                    <Fragment>
                      click to <span style={{ color: "red" }}>delete</span> card
                    </Fragment>
                  }
                >
                  <IconButton
                    id={card._id + "|cards"}
                    onClick={handleDeleteClick}
                  >
                    <DeleteIcon id={card._id + "|cards"} color="error" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardsListComponent;
