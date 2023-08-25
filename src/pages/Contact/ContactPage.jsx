import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import iconPic from "../../assets/imgs/logoForNavbar.png";
import myPic from "../../assets/imgs/myPicture.png";
import COLORS from "../../colors/COLORS";
import ContactComp from "./ContactComp";

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
  const arrOfContactWays = [
    {
      type: "instagram",
      title: "@MedEasyMedService",
      hrefLink: "http://www.instagram.com",
    },
    {
      type: "facebook",
      title: "Med Easy Pharacy Service",
      hrefLink: "http://www.facebook.com",
    },
    {
      type: "whatsapp",
      title: "Send us a message!",
      hrefLink:
        "https://wa.me/972526889067/?text=Hello Med Easy, I'd like to buy a few products from you!",
    },
    {
      type: "phone",
      title: "Call +972-52-688-9067",
      hrefLink: "tel:+972526889067",
    },
    {
      type: "email",
      title: "amit@medezfirm.co.il",
      hrefLink:
        "mailto:amit@medezfirm.co.il?subject=Website%20Message&body=Hello!%20I'd%20like%20to%20talk%20with%20you.",
    },
  ];
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
      <Grid
        container
        sx={{
          p: 1,
          marginBlock: 10,
          justifyContent: "space-around",
          background: COLORS.SECONDARY,
          boxShadow: ` 0 0 15px 15px ${COLORS.SECONDARY} `,
        }}
      >
        {arrOfContactWays.map((item) => (
          <ContactComp
            key={item.title}
            title={item.title}
            hrefLinkProp={item.hrefLink}
            type={item.type}
            linkObjStyleProp={linkObjStyle}
          />
        ))}
      </Grid>
      <Grid
        container
        sx={{
          justifyContent: "space-around",
        }}
      >
        <Grid item xs={12}>
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
              loading="lazy"
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage;
