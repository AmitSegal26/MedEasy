import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ROUTES from "../../routes/ROUTES";
import { useMediaQuery, useTheme } from "@mui/material";
import COLORS from "../../colors/COLORS";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  transition: "all 0.4s ease-in-out",
  "&:hover": {
    backgroundColor: alpha(COLORS.INVERTEDFROMMAIN, 0.15),
  },
  border: "0.1rem solid black",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: COLORS.TEXT1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      width: "15ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchPartial = ({ value }) => {
  const { pathname } = useLocation();
  const [searchInput, setSearchInput] = useState(value);
  const navigate = useNavigate();
  const theme = useTheme();
  const mediaQ = useMediaQuery(theme.breakpoints.down("md"));

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let {
      location: { href },
    } = window;
    if (href.includes(`${ROUTES.CART}`)) {
      href = ROUTES.CART;
    } else {
      href = ROUTES.SHOP;
    }
    navigate(`${href}?filter=${searchInput}`);
  };
  return (
    <form
      onSubmit={handleSearchSubmit}
      style={{
        transform: pathname === ROUTES.HOME ? "translateY(-70px)" : "none",
      }}
    >
      <div style={{ width: mediaQ ? "30vw" : "15vw", marginBottom: "0.3rem" }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleSearchChange}
            value={searchInput}
          />
        </Search>
      </div>
    </form>
  );
};

export default SearchPartial;
