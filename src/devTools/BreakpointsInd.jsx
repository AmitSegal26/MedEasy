import { Box } from "@mui/material";
import React from "react";

const BreakpointsInd = () => {
  return (
    <div>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            md: "none",
            lg: "none",
            xl: "none",
          },
        }}
      >
        xs
      </Box>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "block",
            md: "none",
            lg: "none",
            xl: "none",
          },
        }}
      >
        sm
      </Box>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "block",
            lg: "none",
            xl: "none",
          },
        }}
      >
        md
      </Box>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "none",
            lg: "block",
            xl: "none",
          },
        }}
      >
        lg
      </Box>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "none",
            lg: "none",
            xl: "block",
          },
        }}
      >
        xl
      </Box>
    </div>
  );
};

export default BreakpointsInd;
