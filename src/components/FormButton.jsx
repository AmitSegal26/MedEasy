import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import COLORS from "../colors/COLORS";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const FormButton = (props) => {
  const navigate = useNavigate();
  const [whereToState, setWhereToState] = useState(ROUTES.HOME);
  useEffect(() => {
    setWhereToState(
      localStorage.getItem("prev-page-for-cancel-form-btn") || ROUTES.HOME
    );
  }, []);
  const styleObjOfBtns = {
    flex: " 1 1 0",
    width: "0",
    mt: 3,
    mb: 2,
  };
  const handleCancelClick = () => {
    navigate(whereToState);
  };
  const handleSaveClick = async () => {
    // if the function succeeds then return to the previous page, else dont and keep the user fixing the form
    if (await props.handleFunctionClick()) {
      navigate(whereToState);
    }
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
        onClick={handleSaveClick}
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

FormButton.defaultProps = { isRegisterPage: false };

export default FormButton;
