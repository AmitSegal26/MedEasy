import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { Fragment } from "react";
import COLORS from "../../colors/COLORS";
import makeTitle from "../../utils/makeATitle";
import makeALegitStringForImage from "../../utils/makeALegitStringForImage";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import handleErrorFromAxios from "../../utils/handleError";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UsersListComponent = ({
  payloadProp,
  usersArrProp,
  setUsersArrFunc,
  setDialogItemStateFunc,
  setTypeOfDialogFunc,
  setOpenDialogStateFunc,
  typesOfDialogObjProp,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const mediaQ = useMediaQuery(theme.breakpoints.down("lg"));
  const breakPoint = "lg";
  const styleObjForGridItems = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const handleAuthClickBeforeConfirm = (ev) => {
    if (!ev) {
      return;
    }
    if (!ev.target) {
      return;
    }
    if (!ev.target.id) {
      return;
    }
    if (payloadProp && ev.target.id === payloadProp._id) {
      setDialogItemStateFunc({
        idOfItem: ev.target.id,
      });
      setTypeOfDialogFunc(typesOfDialogObjProp.auth);
      setOpenDialogStateFunc(true);
    } else {
      handleAuthClick(ev);
    }
  };
  const handleAuthClick = async (ev) => {
    if (!ev) {
      return;
    }
    if (!ev.target) {
      return;
    }
    if (!ev.target.id) {
      return;
    }
    try {
      let { data } = await axios.patch(
        `http://localhost:8181/api/users/user/${ev.target.id}`
      );
      if (payloadProp && data && data._id === payloadProp._id) {
        navigate(ROUTES.LOGOUT);
        return;
      }
      let newUsersArr = JSON.parse(JSON.stringify(usersArrProp));
      for (let i = 0; i < newUsersArr.length; i++) {
        if (newUsersArr[i]._id == data._id) {
          newUsersArr[i].isAdmin = data.isAdmin;
        }
      }
      toast.info(
        data && data.name && data.name.first + data && data.isAdmin
          ? " is now admin"
          : " is not admin anymore"
      );
      setUsersArrFunc(newUsersArr);
    } catch (err) {
      handleErrorFromAxios(err, "problem changing authority status", false);
    }
  };
  const handleDeleteFirstClick = (ev) => {
    if (!ev) {
      return;
    }
    if (!ev.target) {
      return;
    }
    let [idOfItem] = ev.target.id.split("|");
    for (let user of usersArrProp) {
      if (user._id == idOfItem) {
        setDialogItemStateFunc({
          idOfItem: ev.target.id,
          nameOfItem: user.name.first,
        });
        setTypeOfDialogFunc(typesOfDialogObjProp.deleteUser);
        setOpenDialogStateFunc(true);
        break;
      }
    }
  };
  const handleMoreInfoClick = (ev) => {
    if (!ev) {
      return;
    }
    if (!ev.target) {
      return;
    }
    if (!ev.target.id) {
      return;
    }
    let [idOfItem, typeOfItem] = ev.target.id.split("|");
    navigate(
      `${
        typeOfItem === "users" ? ROUTES.SPECIFICUSER : ROUTES.SPECIFICPRODUCT
      }/${idOfItem}`
    );
  };
  if (!usersArrProp) {
    return;
  }
  if (!usersArrProp.length) {
    return;
  }
  return (
    <Container maxWidth="lg" component="div">
      <Typography gutterBottom component="h4" variant="h5">
        Number of users on this site: {usersArrProp.length}
      </Typography>
      {mediaQ ? (
        ""
      ) : (
        <Grid container component={Paper} sx={{ mb: 2, p: 1 }}>
          <Grid item xs={2}>
            Name
          </Grid>
          <Grid item xs={2}>
            Email
          </Grid>
          <Grid item xs={2}>
            Authority
          </Grid>
          <Grid item xs={2}>
            Image
          </Grid>
          <Grid item xs={2}>
            Delete
          </Grid>
          <Grid item xs={2}>
            More Info
          </Grid>
        </Grid>
      )}
      {/* container of every user cell */}
      <Grid container>
        {usersArrProp.map((user) => (
          //*user information
          //* user cell
          <Grid
            key={user._id}
            item
            xs={12}
            sx={{
              borderRadius: "10px",
              m: 0.5,
              p: 3,
              backgroundColor:
                payloadProp && user._id === payloadProp._id
                  ? COLORS.MAIN
                  : COLORS.SECONDARY,
              transition: "all 0.3s ease-in-out",
              ":hover": { transform: "scale(1.05)" },
            }}
          >
            {/* container of all sub info */}
            <Grid container spacing={2}>
              <Grid item sx={styleObjForGridItems} xs={6} md={4} lg={2}>
                <Typography sx={{ fontWeight: "bold", color: COLORS.TEXT2 }}>
                  {`${makeTitle(user.name.first)} ${makeTitle(user.name.last)}`}
                </Typography>
              </Grid>
              <Grid item sx={styleObjForGridItems} xs={6} md={4} lg={2}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {user.email}
                </Typography>
              </Grid>
              <Grid item sx={styleObjForGridItems} xs={6} md={4} lg={2}>
                <Tooltip title="click to change status">
                  <Box component="div">
                    {mediaQ ? (
                      <Button
                        id={user._id}
                        onClick={handleAuthClickBeforeConfirm}
                        color="secondary"
                        variant="outlined"
                      >
                        {user.isAdmin ? "Admin" : "Regular User"}
                      </Button>
                    ) : (
                      <Typography
                        id={user._id}
                        sx={{
                          fontWeight: "bold",
                          transition: "all 0.3s linear",
                          cursor: "pointer",
                          ":hover": { transform: "scale(1.2)" },
                        }}
                        onClick={handleAuthClickBeforeConfirm}
                      >
                        {user.isAdmin ? "Admin" : "Regular User"}
                      </Typography>
                    )}
                  </Box>
                </Tooltip>
              </Grid>
              <Grid item sx={styleObjForGridItems} xs={6} md={4} lg={2}>
                <Box
                  component="img"
                  src={makeALegitStringForImage(user)}
                  alt={`${
                    user && user.name && user.name.first
                  }'s profile picture`}
                  sx={{ width: { xs: "12vw", md: "9vw", [breakPoint]: "5vw" } }}
                />
              </Grid>
              <Grid item sx={styleObjForGridItems} xs={6} md={4} lg={2}>
                <Tooltip
                  title={
                    <Fragment>
                      click to <span style={{ color: "red" }}>delete</span> user
                    </Fragment>
                  }
                >
                  <Typography
                    id={user._id + "|users"}
                    color="error"
                    sx={{
                      fontWeight: "bold",
                      transition: "all 0.3s linear",
                      cursor: "pointer",
                      ":hover": { transform: "scale(1.2)" },
                    }}
                    onClick={handleDeleteFirstClick}
                  >
                    Delete
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid item sx={styleObjForGridItems} xs={6} md={4} lg={2}>
                <Tooltip
                  title={
                    <Fragment>
                      click to{" "}
                      <span
                        style={{
                          color: COLORS.INVERTEDFROMMAIN,
                          fontWeight: "bold",
                        }}
                      >
                        view info
                      </span>{" "}
                      of user
                    </Fragment>
                  }
                >
                  <IconButton
                    id={user._id + "|users"}
                    sx={{
                      fontWeight: "bold",
                      transition: "all 0.3s linear",
                      cursor: "pointer",
                      ":hover": { transform: "scale(1.2)" },
                    }}
                    onClick={handleMoreInfoClick}
                  >
                    <OpenInFullIcon id={user._id + "|users"} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UsersListComponent;
