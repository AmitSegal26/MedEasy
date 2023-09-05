import { Box, Button } from "@mui/material";
import React from "react";
import COLORS from "../colors/COLORS";
import { useNavigate } from "react-router-dom";
import HISTORY from "../utils/hrefAndHistory/handleHistoryChange";
import makeLegitRouteForNavigate from "../utils/hrefAndHistory/makeLegitRouteForNavigate";
import ROUTES from "../routes/ROUTES";

const FormButton = (props) => {
  const navigate = useNavigate();
  const styleObjOfBtns = {
    flex: " 1 1 0",
    width: "0",
    mt: 3,
    mb: 2,
  };
  const handleCancelClick = () => {
    if (
      props.toHomePage ||
      HISTORY.getHistory().every((item) => item.includes(ROUTES.CREATE)) ||
      HISTORY.getHistory().every((item) => item.includes(ROUTES.LOGIN))
    ) {
      navigate(ROUTES.HOME);
      return;
    }
    navigate(makeLegitRouteForNavigate(HISTORY.changeToPrev()));
  };
  return (
    <Box component="div" sx={{ width: "100%", display: "flex", gap: "0.6rem" }}>
      <Button
        color="error"
        variant="contained"
        onClick={handleCancelClick}
        sx={{
          ...styleObjOfBtns,
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={props.handleRegisterClickBtnFunc}
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: `${COLORS.INVERTEDFROMMAIN}`,
          ...styleObjOfBtns,
        }}
        disabled={props.disableBtnProp}
      >
        {props.disableBtnProp
          ? "Fill in the fields correctly first"
          : props.textOfBtn}
      </Button>
    </Box>
  );
};

export default FormButton;
