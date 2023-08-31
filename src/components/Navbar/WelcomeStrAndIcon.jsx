import { Grid, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import COLORS from "../../colors/COLORS";
import makeTitle from "../../utils/makeATitle";

const WelcomeStrAndIcon = (props) => {
  const timeOfDay = +Date().split(" ")[4].split(":")[0];
  const [welcomeStr, setWelcomeStr] = useState("good ");
  let isMorning = timeOfDay >= 5 && timeOfDay <= 11;
  let isNoon = timeOfDay >= 12 && timeOfDay <= 18;
  let isEvening = timeOfDay >= 19 && timeOfDay <= 21;
  useEffect(() => {
    let newWelcomeStr = welcomeStr;
    if (isMorning) {
      newWelcomeStr += "morning";
    } else if (isNoon) {
      newWelcomeStr += "afternoon";
    } else if (isEvening) {
      newWelcomeStr += "evening";
    } else {
      newWelcomeStr += "night";
    }
    setWelcomeStr(newWelcomeStr);
  }, []);
  const colorsOfTypography = {
    color: COLORS.TEXT2,
    fontSize: "1.2rem",
  };
  const colorsOfIcons = { sun: "#FFCE3D", sunMoon: "#FFD89F", moon: "#657DA2" };
  const sxForIcons = {
    color: isMorning
      ? colorsOfIcons.sunMoon
      : isNoon
      ? colorsOfIcons.sunMoon
      : colorsOfIcons.moon,
    outline: "0.1rem solid",
    outlineOffset: "0.2rem",
    borderRadius: 3,
  };

  if (props.infoOfUserProp) {
    return (
      <Grid container spacing={1} sx={{ alignItems: "center" }}>
        <Grid item xs={1}>
          {isMorning ? (
            <LightModeIcon sx={sxForIcons} />
          ) : isNoon ? (
            <WbTwilightIcon sx={sxForIcons} />
          ) : (
            <DarkModeIcon sx={sxForIcons} />
          )}
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Typography sx={colorsOfTypography}>
            {props.infoOfUserProp &&
              `${makeTitle(welcomeStr)}, ${makeTitle(
                props.infoOfUserProp.name.first
              )}`}
          </Typography>
        </Grid>
      </Grid>
    );
  } else {
    return "";
  }
};

export default memo(WelcomeStrAndIcon);
