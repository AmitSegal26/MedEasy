import { Button } from "@mui/material";
import React from "react";
import COLORS from "../colors/COLORS";

const FormButton = (props) => {
  return (
    <Button
      onClick={props.handleRegisterClickBtnFunc}
      fullWidth
      variant="contained"
      sx={{
        mt: 3,
        mb: 2,
        backgroundColor: `${COLORS.INVERTEDFROMMAIN}`,
      }}
      disabled={props.disableBtnProp}
    >
      {props.disableBtnProp
        ? "Fill in the fields correctly first"
        : props.textOfBtn}
    </Button>
  );
};

export default FormButton;
