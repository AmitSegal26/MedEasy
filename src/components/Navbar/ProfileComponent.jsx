import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React from "react";
import NavLinkComponent from "./NavbarLinkComponent";

const ProfileComponent = (props) => {
  let base64String = null;
  if (props.imageProp && props.imageProp.dataStr) {
    base64String = props.imageProp.dataStr;
    base64String = atob(base64String.toString("base64")).split("base64,")[1];
  }
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={props.handleOpenUMProp} sx={{ p: 0 }}>
          {props.imageProp ? (
            <Avatar
              alt={props.imageProp ? props.imageProp.alt : "Profile Picture"}
              src={
                props.imageProp
                  ? `data:${props.imageProp.imageFile.contentType};base64,${base64String}`
                  : props.defaultPic
              }
            />
          ) : (
            ""
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={props.anchorElProp}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(props.anchorElProp)}
        onClose={props.handleCloseUMProp}
      >
        {props.profileComponentNav.map((page) => (
          <MenuItem key={page.url} onClick={props.handleCloseUMProp}>
            <NavLinkComponent
              forHambMenu={true}
              url={page.url}
              label={page.label}
            >
              {page.label}
            </NavLinkComponent>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ProfileComponent;
