import { Box, Button, Tooltip } from "@mui/material";
import React from "react";
import COLORS from "../../colors/COLORS";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CollectionsIcon from "@mui/icons-material/Collections";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const ButtonsOfHomePage = ({ breakPointProp }) => {
  const navigate = useNavigate();
  const handleBrowseProductsClick = () => {
    navigate(ROUTES.SHOP);
  };
  const handleReadMoreClick = () => {
    navigate(ROUTES.ABOUT);
  };
  const handleTalkToUsClick = () => {
    navigate(ROUTES.CONTACTUS);
  };
  const handleGalleryClick = () => {
    navigate(ROUTES.GALLERY);
  };
  const arrOfLinks = [
    {
      icon: <ShoppingBasketIcon sx={{ color: COLORS.TEXT1 }} />,
      color: "success",
      text: "To our shop",
      func: handleBrowseProductsClick,
    },
    {
      icon: <HelpCenterIcon sx={{ color: COLORS.TEXT1 }} />,
      color: "info",
      text: "More about us",
      func: handleReadMoreClick,
    },
    {
      icon: <ContactMailIcon sx={{ color: COLORS.TEXT1 }} />,
      color: "secondary",
      text: "Talk to us",
      func: handleTalkToUsClick,
    },
    {
      icon: <CollectionsIcon sx={{ color: COLORS.TEXT1 }} />,
      color: "warning",
      text: "View our gallery",
      func: handleGalleryClick,
    },
  ];
  return (
    <Box
      component="div"
      sx={{
        width: "80%",
        gap: "2rem",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        mb: 5,
      }}
    >
      {arrOfLinks.map((btn) => (
        <Tooltip disableInteractive title={btn.text} key={btn.text}>
          <Button
            onClick={btn.func}
            sx={{
              width: { xs: "100px", [breakPointProp]: "200px" },
              p: 3,
              fontSize: "2rem",
              backgroundColor: COLORS.SECONDARY,
            }}
            variant="contained"
            color={btn.color}
          >
            {btn.icon}
          </Button>
        </Tooltip>
      ))}
    </Box>
  );
};

export default ButtonsOfHomePage;
