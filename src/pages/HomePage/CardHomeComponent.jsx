import {
  Avatar,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import COLORS from "../../colors/COLORS";
import makeTitle from "../../utils/makeATitle";
import makeALegitStringForImage from "../../utils/makeALegitStringForImage";
import logoPic from "../../assets/imgs/MedEasyIcon.png";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const CardHomeComponent = ({ cardProp, index, cardsArrForHomePageProp }) => {
  const navigate = useNavigate();
  const handleCardClick = (e) => {
    if (!e) {
      return;
    }
    if (!e.target) {
      return;
    }
    if (!e.target.id) {
      return;
    }
    navigate(`${ROUTES.SPECIFICPRODUCT}/${e.target.id}`);
  };
  return (
    <Fragment>
      <Card
        raised
        sx={{
          minWidth: "250px",
          maxWidth: "320px",
          transition: "all 0.3s ease-in-out",
          borderRadius: "10px",
          ":hover": {
            transform: "scale(1.05)",
            backgroundColor: COLORS.MAIN,
          },
        }}
      >
        <CardActionArea id={cardProp._id} onClick={handleCardClick}>
          <Typography
            id={cardProp._id}
            component="h5"
            variant="h6"
            color={COLORS.INVERTEDFROMMAIN}
          >
            Click to view item
          </Typography>
          <CardHeader
            id={cardProp._id}
            sx={{ height: "30px" }}
            avatar={
              <Avatar
                id={cardProp._id}
                src={logoPic}
                sx={{ height: "30px", width: "30px" }}
              />
            }
            title={makeTitle(cardProp.title)}
          />
          <CardMedia
            id={cardProp._id}
            component="img"
            src={makeALegitStringForImage(cardProp)}
            alt={cardProp.image.alt || cardProp.title}
          />
        </CardActionArea>
      </Card>
      {index === cardsArrForHomePageProp.length - 1 ? (
        ""
      ) : (
        <Divider flexItem sx={{ borderWidth: "0.1rem", m: 2 }} />
      )}
    </Fragment>
  );
};

export default CardHomeComponent;
