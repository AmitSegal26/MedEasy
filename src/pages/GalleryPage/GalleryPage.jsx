import React, { useState, Fragment } from "react";
import {
  useTheme,
  useMediaQuery,
  Container,
  Typography,
  ImageList,
  ImageListItem,
  Box,
} from "@mui/material";

import ImagePopup from "./ImagePopup";
import makeTitle from "../../utils/makeATitle";

const images = require.context("../../assets/imgs/gallery", true);
let counter = 0;
const imageList = images.keys().map(
  (image) =>
    (image = {
      id: counter++,
      imageSrc: images(image),
      imageAlt: images(image),
    })
);
const GalleryPage = () => {
  const theme = useTheme();
  const [dialogItemState, setDialogItemState] = useState({});
  const mediaLG = useMediaQuery(theme.breakpoints.down("lg"));
  const mediaSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [openPopup, setOpenPopup] = useState(false);
  const styleForImg = {
    maxWidth: mediaLG ? (mediaSM ? "200px" : "250px") : "300px",
    boxSizing: "border-box",
    transition: "all 0.3s cubic-bezier(0.3,0.6,0.2,0)",
    ":hover": {
      border: "3px solid black",
      transform: "scale(1.2)",
    },
  };
  const handleClose = () => {
    setOpenPopup(false);
  };
  const handleOpenPopUp = (ev) => {
    console.log(ev);
    if (ev && !ev.target) {
      return;
    }
    for (let pic of imageList) {
      if (pic.id == ev.target.id) {
        console.log(pic);
        setDialogItemState({
          imgSrc: pic.imageSrc,
          title: makeTitle(pic.imageAlt.split("/")[3].split(".")[0]),
          imageAlt: makeTitle(pic.imageAlt.split("/")[3].split(".")[0]),
        });
        setOpenPopup(true);
        break;
      }
    }
  };
  return (
    <Container
      component="div"
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Typography component="h2" variant="h3">
        Gallery
      </Typography>
      <ImagePopup
        title={dialogItemState.imageAlt}
        open={openPopup}
        handleClose={handleClose}
        imgSrc={dialogItemState.imgSrc}
        imageAlt={dialogItemState.imageAlt}
      />
      <ImageList
        sx={{
          justifyContent: "space-around",
          p: 2,
          width: "95vw",
          height: "fit-content",
        }}
        variant="quilted"
        cols={mediaLG ? (mediaSM ? 2 : 3) : 6}
        gap={9}
      >
        {imageList.map((item) => (
          <Fragment key={item.imageAlt}>
            <ImageListItem
              id={item.id}
              sx={{
                cursor: "pointer",
                maxWidth: "300px",
                maxHeight: "300px",
                overflow: "hidden",
                borderRadius: "10px",
              }}
            >
              <Box
                id={item.id}
                onClick={handleOpenPopUp}
                component="img"
                sx={styleForImg}
                src={item.imageSrc}
                alt={item.imageAlt.split("/")[3].split(".")[0]}
                loading="lazy"
              />
            </ImageListItem>
          </Fragment>
        ))}
      </ImageList>
    </Container>
  );
};

export default GalleryPage;
