import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import COLORS from "../../colors/COLORS";
import "./navbar.css";

//*<NavlinkComponent  url="stringrek" label="keilu" onClick={handleClick} className="redBackground"/>
const NavLinkComponent = ({ url, label, forHambMenu, ...rest }) => {
  return (
    <NavLink to={url} {...rest} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Typography
          sx={{
            my: forHambMenu ? 0 : 2,
            display: "block",
            p: forHambMenu ? 0 : 2,
            transform: forHambMenu ? "scale(0.8)" : "none",
          }}
          color={isActive ? COLORS.TEXT1 : COLORS.TEXT2}
          className="navLink"
          style={
            isActive
              ? {
                  textDecoration: `solid underline ${COLORS.TEXT1} 4px`,
                  textUnderlineOffset: "0.1rem",
                }
              : {}
          }
        >
          {label.toUpperCase()}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;
