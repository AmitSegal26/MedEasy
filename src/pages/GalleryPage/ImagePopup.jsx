import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";

const ImagePopup = ({ title, imgSrc, imgAlt, open, handleClose }) => {
  const handleCloseClick = () => {
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleCloseClick}>
      <DialogTitle>
        <Box
          component="span"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {title}
          <IconButton onClick={handleCloseClick}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <img
          src={imgSrc}
          alt={imgAlt}
          style={{ width: "100%", borderRadius: "7px" }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImagePopup;
