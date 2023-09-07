import React from "react";
import COLORS from "../../colors/COLORS";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import ROUTES from "../../routes/ROUTES";

const NavLinkHambComponent = ({ url, label, ...rest }) => {
  return (
    <NavLink
      to={url}
      {...rest}
      style={{ textDecoration: "none", width: "100%" }}
    >
      {({ isActive }) => (
        <Typography
          sx={{
            textAlign: "center",
            display: "block",
            borderRadius: "5px",
            textDecoration: isActive
              ? `solid underline ${COLORS.TEXT1} 4px`
              : "none",
            textUnderlineOffset: isActive ? "0.1rem" : "none",
            backgroundColor:
              url === ROUTES.LOGIN || url === ROUTES.REGISTER
                ? COLORS.TEXT1
                : "",
            color:
              url === ROUTES.LOGIN || url === ROUTES.REGISTER
                ? COLORS.BACKGROUND
                : isActive
                ? COLORS.TEXT1
                : COLORS.TEXT2,
          }}
        >
          {label.toUpperCase()}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavLinkHambComponent;
