import React from "react";
import { Typography, Box, Button } from "@mui/material";
import COLORS from "../colors/COLORS";
import logoOfWeb from "../assets/imgs/logoOfWeb.png";
import pillsPic from "../assets/imgs/cardDefImg.png";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const ForniturizeDescription = () => {
  const navigate = useNavigate();
  const sxForTypography = {
    color: COLORS.TEXT1,
    mb: 4,
  };
  const handleExploreClick = () => {
    navigate(ROUTES.SHOP);
  };
  return (
    <Box
      sx={{
        textAlign: "center",
        maxWidth: { xs: "90vw", sm: "500px" },
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" component="h1" sx={sxForTypography}>
        We are MedEasy
      </Typography>
      <img
        src={logoOfWeb}
        alt='Logo Of The Website Written "MedEasy"'
        style={{
          borderRadius: "25px",
          marginBottom: "1.3rem",
        }}
      />
      <Typography variant="body1" sx={sxForTypography}>
        Explore a world of pharmaceutical solutions at MedEasy. We offer a
        carefully curated selection of top-quality medications, pills, and
        health supplements to enhance your well-being. Whether you're managing
        specific health needs or seeking general wellness, our range of
        effective and safe products will cater to your every requirement.
      </Typography>
      <Typography variant="body1" sx={sxForTypography}>
        Immerse yourself in our thoughtfully assembled assortment, where science
        meets care and reliability shines. Our team of experts has painstakingly
        sourced remedies from trusted pharmaceutical sources, ensuring each
        product reflects unwavering quality and effectiveness.
      </Typography>
      <Typography variant="body1" sx={sxForTypography}>
        Browse our extensive catalog and discover solutions that align with your
        individual health goals. With a variety of formulations, dosages, and
        options, MedEasy provides choices for every requirement and medical
        concern. From holistic wellness to targeted treatments, we have the
        perfect products to support your journey to better health.
      </Typography>
      <Typography variant="body1">
        At MedEasy, we take pride in delivering exceptional customer support.
        Our informed team is prepared to assist you with any inquiries, ensuring
        a smooth and gratifying shopping experience. Experience the science of
        pharmaceutical curation and elevate your health with MedEasy today.
      </Typography>
      <Typography
        variant="h2"
        component="h3"
        style={{ marginTop: "4rem" }}
        sx={sxForTypography}
      >
        Are You Still here?
      </Typography>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          sx={{ color: COLORS.INVERTEDFROMMAIN }}
        >
          What are you waiting for?
        </Typography>
        <img
          src={pillsPic}
          alt="Animated Pills"
          style={{ width: "15%", height: "15%", borderRadius: "10px" }}
        />
      </Box>
      <Button
        onClick={handleExploreClick}
        variant="contained"
        sx={{
          mt: "0.6rem",
          backgroundColor: COLORS.TEXT1,
          height: "90px",
          borderRadius: "15px",
          fontSize: "2rem",
        }}
      >
        Explore Our Products
      </Button>
    </Box>
  );
};

export default ForniturizeDescription;
