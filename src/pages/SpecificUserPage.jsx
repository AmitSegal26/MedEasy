import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import validateIdSchema from "../validations/idValidate";
import ROUTES from "../routes/ROUTES";
import handleErrorFromAxios from "../utils/handleError";
import axios from "axios";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import makeALegitStringForImage from "../utils/makeALegitStringForImage";
import BackArrowButtonComp from "../components/BackArrowButtonComp";
import COLORS from "../colors/COLORS";

const SpecificUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (validateIdSchema(id)) {
      navigate(ROUTES.CRM);
    } else {
      (async () => {
        try {
          let { data } = await axios.get(
            `http://localhost:8181/api/users/user/${id}`
          );
          setUserData(data);
        } catch (err) {
          handleErrorFromAxios(err, "problem loading the user", false);
        }
      })();
    }
  }, [id]);
  const styleForTypography = {
    fontSize: "2rem",
    fontWeight: "bolder",
    cursor: "default",
  };
  const styleForSpanTitle = {
    fontSize: "1.5rem",
    display: "inline-block",
    cursor: "default",
    color: COLORS.INVERTEDFROMMAIN,
    transition: "all 0.3s linear",
    textDecoration: "underline",
    ":hover": { transform: "scale(1.2)" },
  };
  const breakPoint = "md";
  if (!userData) {
    return <CircularProgress sx={{ color: "green" }} />;
  }
  return (
    <Container maxWidth="md">
      <Box
        component="div"
        sx={{ display: "flex", justifyContent: "flex-start" }}
      >
        <BackArrowButtonComp route={ROUTES.CRM} />
      </Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", [breakPoint]: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: { xs: "", [breakPoint]: "5rem" },
          }}
        >
          <Typography component="div" sx={styleForTypography}>
            <Box component="span" sx={styleForSpanTitle}>
              Name:
            </Box>
            <br />
            {userData.name.first + " " + userData.name.last}
          </Typography>
          <Typography component="div" sx={styleForTypography}>
            <Box component="span" sx={styleForSpanTitle}>
              Gender:
            </Box>
            <br />
            {userData.gender}
          </Typography>
          <Typography component="div" sx={styleForTypography}>
            <Box component="span" sx={styleForSpanTitle}>
              Email:
            </Box>
            <br />
            {userData.email}
          </Typography>
          <Typography component="div" sx={styleForTypography}>
            <Box component="div" sx={styleForSpanTitle}>
              Type of user:
            </Box>
            <br />
            {userData.isAdmin ? "Admin" : "Regular"}
          </Typography>
        </Box>
        <Box
          component="img"
          sx={{
            width: "30vw",
            borderRadius: "25px",
            border: "3px solid black",
          }}
          src={makeALegitStringForImage(userData)}
          alt={userData.name.first}
        />
      </Box>
    </Container>
  );
};

export default SpecificUserPage;
