import React from "react";
import { Typography, Box } from "@mui/material";
import COLORS from "../colors/COLORS";

const ForniturizeDescription = () => {
  const sxForTypography = {
    color: COLORS.TEXT1,
    mb: 4,
  };
  return (
    <Box
      sx={{
        textAlign: "center",
        maxWidth: { xs: "90vw", sm: "500px" },
        margin: "0 auto",
      }}
    >
      <Typography variant="h2" component="h1" sx={sxForTypography}>
        Welcome to Forniturize
      </Typography>
      <Typography variant="body1" sx={sxForTypography}>
        Discover a world of exquisite furniture at Forniturize. We offer a
        curated collection of high-quality chairs, tables, beds, and more to
        elevate your living spaces. Whether you're furnishing a cozy home or
        designing a modern office, our range of stylish and functional furniture
        pieces will meet your every need.
      </Typography>
      <Typography variant="body1" sx={sxForTypography}>
        Immerse yourself in our carefully selected assortment, where form meets
        function and craftsmanship shines. Our team of experts has meticulously
        sourced furniture from renowned designers and manufacturers, ensuring
        each piece reflects timeless elegance and durability.
      </Typography>
      <Typography variant="body1" sx={sxForTypography}>
        Browse our extensive catalog and discover furniture that captures your
        unique style. With a variety of materials, colors, and designs,
        Forniturize offers options for every taste and interior aesthetic. From
        contemporary minimalism to classic sophistication, we have the perfect
        pieces to transform your space into a reflection of your personal style.
      </Typography>
      <Typography variant="body1">
        At Forniturize, we pride ourselves on exceptional customer service. Our
        knowledgeable team is ready to assist you with any inquiries, ensuring a
        seamless and enjoyable shopping experience. Experience the art of
        furniture curation and elevate your surroundings with Forniturize today.
      </Typography>
    </Box>
  );
};

export default ForniturizeDescription;
