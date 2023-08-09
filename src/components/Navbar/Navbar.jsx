import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import defaultMale from "../../assets/imgs/maleAvatar.jpg";
import defaultFemale from "../../assets/imgs/femaleAvatarpng.jpg";
import defaultOther from "../../assets/imgs/otherAvatar.jpg";
import errorImg from "../../assets/imgs/cancelIMG.png";
import NavbarLinkComponent from "./NavbarLinkComponent";
import COLORS from "../../colors/COLORS";
import ProfileComponent from "./ProfileComponent";
import HamburgerMenu from "./HamburgerMenu";
import { useSelector } from "react-redux";
import WelcomeStrAndIcon from "./WelcomeStrAndIcon";
import logoOfWeb from "../../assets/imgs/logoForNavbar.png";
import "./navbar.css";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  const pagesOrg = [
    payload
      ? { label: "profile", url: ROUTES.PROFILE }
      : { label: "register", url: ROUTES.REGISTER },
    payload
      ? { label: "log out", url: ROUTES.LOGOUT }
      : { label: "login", url: ROUTES.LOGIN },
    payload && payload.isAdmin
      ? { label: "CRM", url: ROUTES.CRM }
      : { label: "ignore", url: ROUTES.CRM },
    { label: "shop", url: ROUTES.SHOP },
    { label: "gallery", url: ROUTES.GALLERY },
    { label: "contact us", url: ROUTES.CONTACTUS },
    { label: "about", url: ROUTES.ABOUT },
  ];
  let pages1stHalf = JSON.parse(JSON.stringify(pagesOrg));
  pages1stHalf = pages1stHalf.filter((page) => page.label != "ignore");
  const pages2ndHalf = pages1stHalf.splice(Math.floor(pages1stHalf.length / 2));
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: COLORS.MAIN,
        maxHeight: "60px",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ maxHeight: "60px" }}>
          <Box
            sx={{
              display: { xs: "none", lg: "block" },
            }}
          >
            <WelcomeStrAndIcon payloadProp={payload} />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", lg: "flex" },
              flexDirection: "row-reverse",
            }}
          >
            {pages1stHalf.map((page) =>
              page.label == "ignore" ? (
                ""
              ) : (
                <NavbarLinkComponent
                  key={page.url}
                  label={page.label}
                  url={page.url}
                  {...page}
                />
              )
            )}
          </Box>
          <img
            onClick={handleLogoClick}
            src={logoOfWeb}
            alt='Logo Of Website written "MedEasy"'
            style={{
              width: "7%",
              maxHeight: "50px",
              borderRadius: "50px",
              cursor: "pointer",
            }}
          />
          {/* main navbar on desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
            {pages2ndHalf.map((page) =>
              page.label == "ignore" ? (
                ""
              ) : (
                <NavbarLinkComponent
                  key={page.url}
                  label={page.label}
                  url={page.url}
                  {...page}
                />
              )
            )}
          </Box>
          <HamburgerMenu
            handleOpenNMProp={handleOpenNavMenu}
            handleCloseNMProp={handleCloseNavMenu}
            anchorElNavProp={anchorElNav}
            pagesProp={pagesOrg}
          />
          <ProfileComponent
            imageProp={payload && payload.image}
            profileComponentNav={settings}
            anchorElProp={anchorElUser}
            handleCloseUMProp={handleCloseUserMenu}
            handleOpenUMProp={handleOpenUserMenu}
            defaultPic={
              payload && payload.gender == "male"
                ? defaultMale
                : payload && payload.gender == "female"
                ? defaultFemale
                : payload && payload.gender == "other"
                ? defaultOther
                : errorImg
            }
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
