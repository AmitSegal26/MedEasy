import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import COLORS from "../../colors/COLORS";
import ROUTES from "../../routes/ROUTES";
//css
import "./navbar.css";

const NavLinkComponent = ({ url, label, ...rest }) => {
  return (
    <NavLink to={url} {...rest} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Typography
          sx={{
            p: 1.5,
            m: 2,
            display: "block",
            backgroundColor:
              url === ROUTES.LOGIN
                ? "transparent"
                : url === ROUTES.REGISTER
                ? COLORS.TEXT2
                : "",
            textDecoration:
              isActive && url !== ROUTES.LOGIN && url !== ROUTES.REGISTER
                ? `solid underline ${COLORS.TEXT1} 4px`
                : "none",
            textUnderlineOffset: isActive ? "0.1rem" : "none",
            borderRadius: 2,
            border:
              url === ROUTES.LOGIN
                ? `2px solid ${COLORS.TEXT1}`
                : url === ROUTES.REGISTER
                ? `2px solid transparent`
                : "",
            fontWeight:
              url === ROUTES.LOGIN
                ? "bold"
                : url === ROUTES.REGISTER
                ? "bold"
                : "",
            color:
              url === ROUTES.REGISTER
                ? COLORS.MAIN
                : isActive
                ? COLORS.TEXT1
                : COLORS.TEXT2,
          }}
          className={
            url !== ROUTES.LOGIN && url !== ROUTES.REGISTER ? "navLink" : ""
          }
        >
          {label.toUpperCase()}
        </Typography>
      )}
    </NavLink>
  );
};
export default NavLinkComponent;
