import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import COLORS from "../../colors/COLORS";
import "./navbar.css";
import ROUTES from "../../routes/ROUTES";

//*<NavlinkComponent  url="stringrek" label="keilu" onClick={handleClick} className="redBackground"/>
const NavLinkComponent = ({ url, label, ...rest }) => {
  return (
    <NavLink to={url} {...rest} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Typography
          sx={{
            p: 2,
            m: 2,
            display: "block",
            backgroundColor:
              url === ROUTES.LOGIN
                ? COLORS.TEXT1
                : url === ROUTES.REGISTER
                ? COLORS.TEXT2
                : "",
            textDecoration: isActive
              ? `solid underline ${
                  url === ROUTES.REGISTER || url === ROUTES.LOGIN
                    ? COLORS.SECONDARY
                    : COLORS.TEXT1
                } 4px`
              : "none",
            textUnderlineOffset: isActive ? "0.1rem" : "none",
            borderRadius: 2,
            fontWeight:
              url === ROUTES.LOGIN
                ? "bold"
                : url === ROUTES.REGISTER
                ? "bold"
                : "",
            color:
              url === ROUTES.LOGIN
                ? COLORS.SECONDARY
                : url === ROUTES.REGISTER
                ? COLORS.MAIN
                : isActive
                ? COLORS.TEXT1
                : COLORS.TEXT2,
          }}
          className="navLink"
        >
          {label.toUpperCase()}
        </Typography>
      )}
    </NavLink>
  );
};
export default NavLinkComponent;
