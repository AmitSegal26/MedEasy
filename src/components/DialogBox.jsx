import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const DialogBox = ({
  openStateProp,
  setOpenFunc,
  title,
  description,
  agreeText,
  disagreeText,
  agreeFunc,
  idOfComponent,
  colorOfDisagreeBtn,
  colorOfAgreeBtn,
}) => {
  const handleClose = () => {
    setOpenFunc(false);
  };
  const handleAgree = (ev) => {
    agreeFunc(ev);
    setOpenFunc(false);
  };
  return (
    <Dialog
      open={openStateProp}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color={colorOfDisagreeBtn} onClick={handleClose}>
          {disagreeText}
        </Button>
        <Button
          id={idOfComponent}
          color={colorOfAgreeBtn}
          onClick={handleAgree}
          autoFocus
        >
          {agreeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
DialogBox.defaultProps = {
  openStateProp: false,
  title: "are you sure you want to proceed?",
  description: "after clicking the 'agree' - there is no coming back",
  agreeText: "Agree",
  disagreeText: "Cancel",
  colorOfAgreeBtn: "success",
  colorOfDisagreeBtn: "error",
};

export default DialogBox;
