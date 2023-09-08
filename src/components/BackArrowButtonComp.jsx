import React from "react";
import { Button, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackArrowButtonComp = ({ route }) => {
  const navigate = useNavigate();
  return (
    <Tooltip title="exit">
      <Button
        onClick={() => {
          navigate(route);
        }}
        color="error"
        variant="contained"
        sx={{ m: 1 }}
      >
        <ArrowBackIcon />
      </Button>
    </Tooltip>
  );
};

export default BackArrowButtonComp;
