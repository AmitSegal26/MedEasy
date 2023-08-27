import React from "react";
import { Box, Grid, Tooltip } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";

const SortFilterDisplayComp = ({
  isStockFilteredProp,
  filterOnStockFunc,
  sortDESCFunc,
  sortASCFunc,
  removeSortFunc,
  handleChangeDisplayModeToNormalFunc,
  handleChangeDisplayModeToListFunc,
}) => {
  return (
    <Grid container spacing={2} sx={{ textAlign: "center" }}>
      <Grid item xs={4}>
        <Tooltip title="Show only on stock">
          <Box component="h6">
            {isStockFilteredProp ? (
              <FilterAltOffIcon
                onClick={filterOnStockFunc}
                sx={{
                  fontSize: "2rem",
                  ":hover": {
                    border: "0.2rem solid white",
                    cursor: "pointer",
                  },
                }}
              />
            ) : (
              <FilterAltIcon
                onClick={filterOnStockFunc}
                sx={{
                  fontSize: "2rem",
                  ":hover": {
                    border: "0.2rem solid white",
                    cursor: "pointer",
                  },
                }}
              />
            )}
          </Box>
        </Tooltip>
      </Grid>
      <Grid item xs={4}>
        <Tooltip title="Sort price from high to low">
          <SortIcon
            onClick={sortDESCFunc}
            sx={{
              fontSize: "2rem",
              m: 2,
              ":hover": { border: "0.2rem solid white", cursor: "pointer" },
            }}
          />
        </Tooltip>
        <Tooltip title="Sort price from low to high">
          <SortIcon
            onClick={sortASCFunc}
            sx={{
              transform: "rotateX(180deg)",
              fontSize: "2rem",
              m: 2,
              ":hover": { border: "0.2rem solid white", cursor: "pointer" },
            }}
          />
        </Tooltip>
        <Tooltip title="Remove sort">
          <FilterListIcon
            onClick={removeSortFunc}
            sx={{
              fontSize: "2rem",
              m: 2,
              ":hover": { border: "0.2rem solid white", cursor: "pointer" },
            }}
          />
        </Tooltip>
      </Grid>
      <Grid item xs={4}>
        <Tooltip title="Normal display">
          <GridViewIcon
            onClick={handleChangeDisplayModeToNormalFunc}
            sx={{
              fontSize: "2rem",
              m: 2,
              ":hover": { border: "0.2rem solid white", cursor: "pointer" },
            }}
          />
        </Tooltip>
        <Tooltip title="List display">
          <FormatListBulletedIcon
            onClick={handleChangeDisplayModeToListFunc}
            sx={{
              fontSize: "2rem",
              m: 2,
              ":hover": { border: "0.2rem solid white", cursor: "pointer" },
            }}
          />
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default SortFilterDisplayComp;
