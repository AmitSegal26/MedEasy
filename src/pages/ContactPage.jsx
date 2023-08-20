import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import iconPic from "../assets/imgs/logoForNavbar.png";
import myPic from "../assets/imgs/myPicture.png";
import COLORS from "./../colors/COLORS";

const customPaper = ({ children }) => (
  <Paper
    sx={{
      width: "fit-content",
      marginBlock: 4,
      p: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      transition: "all 0.3s linear",
      ":hover": { backgroundColor: "#fff9" },
    }}
    elevation={20}
  >
    {children}
  </Paper>
);
const ContactPage = () => {
  const linkObjStyle = { color: COLORS.TEXT1, textDecoration: "none" };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography sx={{ mb: 2 }} component="h2" variant="h2">
        Contact us!
      </Typography>
      <Box component={customPaper}>
        <Typography
          sx={{
            //! fontSize: "3rem",
            WebkitFlexBasis: 1,
          }}
          component="h2"
        >
          Owner: Amit Segal
        </Typography>
        <Box
          component="img"
          src={myPic}
          alt="owners face"
          sx={{
            width: "10vw",
          }}
        />
        <Box
          component="img"
          sx={{ width: "30vw", borderRadius: "10px", m: 3, mb: 6 }}
          src={iconPic}
          alt="logo of the company written MedEasy"
        />
      </Box>
      <Grid container sx={{ marginBlock: 10 }}>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <AlternateEmailIcon sx={{ fontSize: "2rem" }} />
          <Typography
            component="a"
            href="mailto:amit@medezfirm.co.il?subject=Website%20Message&body=Hello!%20I'd%20like%20to%20talk%20with%20you."
            target="_blank"
            sx={{
              ml: 1,
              ":link": linkObjStyle,
              ":visited": linkObjStyle,
              ":hover": { textDecoration: "underline" },
            }}
          >
            amit@medezfirm.co.il
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ color: "green", display: "flex", alignItems: "center" }}
        >
          <WhatsAppIcon sx={{ fontSize: "2rem" }} />
          <Typography
            component="a"
            href="https://wa.me/972526889067/?text=Hello Med Easy, I'd like to buy a few products from you!"
            target="_blank"
            sx={{
              ml: 1,
              ":link": linkObjStyle,
              ":visited": linkObjStyle,
              ":hover": { textDecoration: "underline" },
            }}
          >
            Send us a message!
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <InstagramIcon
            sx={{
              fontSize: "2rem",
              borderRadius: "5px",
              background:
                " radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
            }}
          />
          <Typography
            component="a"
            href="http://www.instagram.com"
            target="_blank"
            sx={{
              ml: 1,
              ":link": linkObjStyle,
              ":visited": linkObjStyle,
              ":hover": { textDecoration: "underline" },
            }}
          >
            @MedEasyMedService
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <FacebookIcon sx={{ fontSize: "2rem", color: "#1877F2" }} />
          <Typography
            component="a"
            href="http://www.facebook.com"
            target="_blank"
            sx={{
              ml: 1,
              ":link": linkObjStyle,
              ":visited": linkObjStyle,
              ":hover": { textDecoration: "underline" },
            }}
          >
            Med Easy Pharacy Service
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ContactPhoneIcon sx={{ fontSize: "2rem" }} />
          <Typography
            component="a"
            href="tel:0526889067"
            target="_blank"
            sx={{
              ml: 1,
              ":link": linkObjStyle,
              ":visited": linkObjStyle,
              ":hover": { textDecoration: "underline" },
            }}
          >
            052-6889067
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 5 }}>
          <Box component="div" sx={{ height: "90px" }} />
          <LocationOnIcon sx={{ fontSize: "4rem" }} />
          <Typography component="h4" variant="h6">
            Our Factory On The Map!
          </Typography>
          <Grid item xs={12}>
            <iframe
              title="Location of MedEasy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1013112.1548287777!2d-55.12083559172938!3d-7.301046927993142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92f938ebd781ba43%3A0x54fb527661750377!2sBa%C3%BA%2C%20Altamira%20-%20State%20of%20Par%C3%A1%2C%20Brazil!5e0!3m2!1sen!2sil!4v1692523059272!5m2!1sen!2sil"
              height="450"
              style={{ border: "2px solid black", width: "60vw" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage;
