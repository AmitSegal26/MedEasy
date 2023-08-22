import React from "react";
import { Grid, Typography } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const ContactComp = ({ title, type, hrefLinkProp, linkObjStyleProp }) => {
  const fontSizeOfIcons = "4rem";
  return (
    <Grid
      item
      xs={12}
      lg={4}
      sx={{ display: "flex", alignItems: "center", m: 1 }}
    >
      {type == "facebook" ? (
        <FacebookIcon sx={{ fontSize: fontSizeOfIcons, color: "#1877F2" }} />
      ) : type == "instagram" ? (
        <InstagramIcon
          sx={{
            fontSize: fontSizeOfIcons,
            borderRadius: "5px",
            background:
              " radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
          }}
        />
      ) : type == "whatsapp" ? (
        <WhatsAppIcon sx={{ fontSize: fontSizeOfIcons, color: "green" }} />
      ) : type == "phone" ? (
        <ContactPhoneIcon sx={{ fontSize: fontSizeOfIcons }} />
      ) : (
        <AlternateEmailIcon sx={{ fontSize: fontSizeOfIcons }} />
      )}
      <Typography
        component="a"
        href={hrefLinkProp}
        target="_blank"
        sx={{
          ml: 1,
          ":link": linkObjStyleProp,
          ":visited": linkObjStyleProp,
          ":hover": { textDecoration: "underline" },
        }}
      >
        {title}
      </Typography>
    </Grid>
  );
};

export default ContactComp;
