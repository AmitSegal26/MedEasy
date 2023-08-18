import React from "react";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import iconPic from "../assets/imgs/logoForNavbar.png";
import myPic from "../assets/imgs/myPicture.png";
const ContactPage = () => {
  return (
    <Container maxWidth="lg">
      <Typography sx={{ mb: 2 }} component="h2" variant="h2">
        Contact us!
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Box
            component="img"
            src={myPic}
            alt="owners face"
            sx={{
              width: "10vw",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{ width: "30vw", borderRadius: "10px", m: 3, mb: 6 }}
            component="img"
            src={iconPic}
            alt="logo of the company written MedEasy"
          />
        </Grid>
        <Grid item xs={4}>
          <AlternateEmailIcon />
        </Grid>
        <Grid item xs={4}>
          <WhatsAppIcon />
        </Grid>
        <Grid item xs={4}>
          <InstagramIcon />
        </Grid>
        <Grid item xs={4}>
          <FacebookIcon />
        </Grid>
        <Grid item xs={4}>
          <ContactPhoneIcon />
        </Grid>
        <Box component="div" sx={{ height: "90px" }} />
        <Grid item xs={4}></Grid>
        <Grid item xs={12}>
          <LocationOnIcon sx={{ fontSize: "4rem" }} />
          <Grid item xs={12}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4483607.083791292!2d27.821102937566934!3d34.70048272073412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sil!4v1692387762319!5m2!1sen!2sil"
              width="600"
              height="450"
              style={{ border: "2px solid black" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage;
