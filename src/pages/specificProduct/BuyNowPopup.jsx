import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import cardImg from "../../assets/imgs/logoForNavbar.png";

const BuyNowPopup = ({ openStateProp, setOpenFunc, title }) => {
  const handleClose = () => {
    setOpenFunc(false);
  };
  return (
    <Dialog
      open={openStateProp}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        component="img"
        style={{ aspectRatio: "1/1", height: "100%" }}
        src={cardImg}
        alt="pack of pills with a smiley on it"
      />
      <Box component="span">
        <DialogTitle id="alert-dialog-title">
          Purchasing '{title}'
          <Box component="span" sx={{ color: "red" }}>
            {" "}
            is not possible for now
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hello fellow customer! <br />
            this website is not fully developed for purchasing yet. <br />
            Please <b>do come back soon </b>to complete the purchase. For now,
            have a great day!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} autoFocus>
            OK! I'll come back really soon!
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
BuyNowPopup.defaultProps = {
  openStateProp: false,
  title: "?",
};

export default BuyNowPopup;
