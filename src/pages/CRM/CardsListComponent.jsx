import { Box, Container, Grid, IconButton, Paper } from "@mui/material";
import React from "react";
import makeALegitStringForImage from "../../utils/makeALegitStringForImage";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import useReadCard from "../../hooks/useReadCard";
import useEditCard from "../../hooks/useEditCard";
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
  return (
    <Container maxWidth="lg">
      <Grid container>
        {cardsArrProp.map((card) => (
          <Grid
            component={Paper}
            sx={{ m: 1, p: 1 }}
            key={card._id}
            item
            xs={12}
          >
            <Grid container>
              <Grid item xs={4} md={2} sx={styleObjForGridItems}>
                {card.title}
              </Grid>
              <Grid item xs={4} md={2} sx={styleObjForGridItems}>
                Stock: {card.stock}
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
                <IconButton id={card._id} onClick={handleShowMoreClick}>
                  <OpenInFullIcon id={card._id} color="primary" />
                </IconButton>
              </Grid>
              <Grid item xs={4} md={2} sx={styleObjForGridItems}>
                <IconButton id={card._id} onClick={handleEditClick}>
                  <EditIcon id={card._id} color="warning" />
                </IconButton>
              </Grid>
              <Grid item xs={4} md={2} sx={styleObjForGridItems}>
                <IconButton
                  id={card._id + "|cards"}
                  onClick={handleDeleteClick}
                >
                  <DeleteIcon id={card._id + "|cards"} color="error" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardsListComponent;
