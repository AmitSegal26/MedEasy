import React from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavLinkHambComponent from "./NavLinkHambComponent";

const HamburgerMenu = (props) => {
  //!important to put them in variables so the BREAKPOINTS values will be the same
  let disappearAndDisplay = { flex: "xs", none: "lg" };
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: {
          [disappearAndDisplay.flex]: "flex",
          [disappearAndDisplay.none]: "none",
        },
      }}
    >
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={props.handleOpenNMProp}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={props.anchorElNavProp}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(props.anchorElNavProp)}
        onClose={props.handleCloseNMProp}
        sx={{
          display: {
            [disappearAndDisplay.flex]: "block",
            [disappearAndDisplay.none]: "none",
          },
        }}
      >
        {props.pagesProp.map((page) => (
          <MenuItem key={page.label} onClick={props.handleCloseNMProp}>
            <NavLinkHambComponent label={page.label} url={page.url} {...page} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default HamburgerMenu;
