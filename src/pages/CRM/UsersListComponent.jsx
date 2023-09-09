import {
  Box,
  Button,
  Grid,
  IconButton,
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
  const mediaQ = useMediaQuery(theme.breakpoints.down("md"));
  const breakPoint = "md";
  const dividerOfGridMUI = mediaQ ? 12 : 2;
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
  return (
    <Box component="div">
      {mediaQ ? (
        ""
      ) : (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={dividerOfGridMUI}>
            Name
          </Grid>
          <Grid item xs={dividerOfGridMUI}>
            Email
          </Grid>
          <Grid item xs={dividerOfGridMUI}>
            Authority
          </Grid>
          <Grid item xs={dividerOfGridMUI}>
            Image
          </Grid>
          <Grid item xs={dividerOfGridMUI}>
            Delete
          </Grid>
          <Grid item xs={dividerOfGridMUI}>
            More Info
          </Grid>
        </Grid>
      )}

      {usersArrProp.map((user) => (
        //*user information
        <Grid
          container
          sx={{
            backgroundColor:
              payloadProp && user._id === payloadProp._id
                ? COLORS.MAIN
                : COLORS.SECONDARY,
            width: "100%",
            p: 2,
            mb: 2,
            display: "flex",
            borderRadius: "10px",
          }}
          spacing={0.5}
          key={user._id}
        >
          <Grid item xs={dividerOfGridMUI}>
            <Typography sx={{ fontWeight: "bold", color: COLORS.TEXT2 }}>
              {`${makeTitle(user.name.first)} ${makeTitle(user.name.last)}`}
            </Typography>
          </Grid>
          <Grid item xs={dividerOfGridMUI}>
            <Typography sx={{ fontWeight: "bold" }}>{user.email}</Typography>
          </Grid>
          <Tooltip title="click to change status">
            <Grid item xs={dividerOfGridMUI}>
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
            </Grid>
          </Tooltip>
          <Grid item xs={dividerOfGridMUI}>
            <Box
              component="img"
              src={makeALegitStringForImage(user)}
              alt={`${user && user.name && user.name.first}'s profile picture`}
              sx={{ width: { xs: "7vw", [breakPoint]: "5vw" } }}
            />
          </Grid>
          <Tooltip
            title={
              <Fragment>
                click to <span style={{ color: "red" }}>delete</span> user
              </Fragment>
            }
          >
            <Grid item xs={dividerOfGridMUI}>
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
            </Grid>
          </Tooltip>
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
            <Grid item xs={dividerOfGridMUI}>
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
            </Grid>
          </Tooltip>
        </Grid>
      ))}
    </Box>
  );
};

export default UsersListComponent;
