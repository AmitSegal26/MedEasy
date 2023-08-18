import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

const ImagePopup = ({ title, imgSrc, imgAlt, open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
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
