import React, { Fragment } from "react";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SortIcon from "@mui/icons-material/Sort";
import COLORS from "../../colors/COLORS";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
const SortFilterDisplayComp = ({
  isStockFilteredProp,
  filterOnStockFunc,
  sortDESCFunc,
  sortASCFunc,
  sortRateDESCFunc,
  sortRateASCFunc,
  sortStateProp,
  removeSortFunc,
  handleChangeDisplayModeToNormalFunc,
  handleChangeDisplayModeToListFunc,
  displayAsCardsStateProp,
}) => {
  const sortStyleObj = (sortType = "", arg = null) => {
    return {
      borderRadius: "5px",
      backgroundColor:
        sortStateProp == sortType || displayAsCardsStateProp == sortType
          ? COLORS.INVERTEDFROMMAIN
          : "",
      transform: `${arg == "inverted" ? "rotateX(180deg)" : ""}${
        sortStateProp == sortType ? "scale(1.25)" : ""
      }`,
      fontSize: "2rem",
      m: 2,
      p: 0.2,
      cursor: "pointer",
      color:
        sortStateProp == sortType || displayAsCardsStateProp == sortType
          ? "white"
          : "",
    };
  };
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="h6" color="primary" align="center">
            Filter
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" color="primary" align="center">
            Sort
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" color="secondary" align="center">
            Display
          </Typography>
        </Grid>
      </Grid>
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
          <Tooltip title="Best rating from high to low">
            <ThumbUpIcon
              onClick={sortRateDESCFunc}
              sx={sortStyleObj("descRate")}
            />
          </Tooltip>
          <Tooltip title="Lowest rating from low to high">
            <ThumbDownIcon
              onClick={sortRateASCFunc}
              sx={sortStyleObj("ascRate")}
            />
          </Tooltip>
          <Tooltip title="Sort price from high to low">
            <SortIcon onClick={sortDESCFunc} sx={sortStyleObj("desc")} />
          </Tooltip>
          <Tooltip title="Sort price from low to high">
            <SortIcon
              onClick={sortASCFunc}
              sx={sortStyleObj("asc", "inverted")}
            />
          </Tooltip>
          <Tooltip title="Remove sort">
            <RestartAltIcon
              onClick={removeSortFunc}
              sx={{
                fontSize: "2rem",
                m: 2,
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Tooltip title="Normal display">
            <GridViewIcon
              onClick={handleChangeDisplayModeToNormalFunc}
              sx={sortStyleObj(true)}
            />
          </Tooltip>
          <Tooltip title="List display">
            <FormatListBulletedIcon
              onClick={handleChangeDisplayModeToListFunc}
              sx={sortStyleObj(false)}
            />
          </Tooltip>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SortFilterDisplayComp;
