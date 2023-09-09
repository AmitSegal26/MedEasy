import React, { Fragment, useEffect, useState } from "react";
import handleErrorFromAxios from "../utils/handleError";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import COLORS from "../colors/COLORS";
import makeALegitStringForImage from "../utils/makeALegitStringForImage";
import DialogBox from "../components/DialogBox";
import { toast } from "react-toastify";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import makeTitle from "./../utils/makeATitle";
import { useSelector } from "react-redux";

const CRMPage = () => {
  const theme = useTheme();
  const mediaQ = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  const [openDialogState, setOpenDialogState] = useState(false);
  const [typeOfDialog, setTypeOfDialog] = useState("");
  const [dialogItemState, setDialogItemState] = useState({
    idOfItem: "",
    nameOfItem: "",
  });
  const [usersArr, setUsersArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("http://localhost:8181/api/users/users");
        setUsersArr(data);
        let { data: items } = await axios.get(
          "http://localhost:8181/api/cards/allCards"
        );
        setCardsArr(items);
      } catch (err) {
        handleErrorFromAxios(err, undefined, false);
      }
    })();
  }, []);

  const typesOfDialog = { auth: "authorization", delete: "delete" };
  const handleAuthClickBeforeConfirm = (ev) => {
    if (!ev) {
      return;
    }
    if (!ev.target) {
      return;
    }
    if (payload && ev.target.id === payload._id) {
      setDialogItemState({
        idOfItem: ev.target.id,
      });
      setTypeOfDialog(typesOfDialog.auth);
      setOpenDialogState(true);
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
    try {
      let { data } = await axios.patch(
        `http://localhost:8181/api/users/user/${ev.target.id}`
      );
      if (payload && data && data._id === payload._id) {
        navigate(ROUTES.LOGOUT);
        return;
      }
      let newUsersArr = JSON.parse(JSON.stringify(usersArr));
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
      setUsersArr(newUsersArr);
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
    for (let user of usersArr) {
      if (user._id == idOfItem) {
        setDialogItemState({
          idOfItem: ev.target.id,
          nameOfItem: user.name.first,
        });
        setTypeOfDialog(typesOfDialog.delete);
        setOpenDialogState(true);
        break;
      }
    }
  };
  const handleDeleteAfterConfirm = async (ev) => {
    if (!ev) {
      return;
    }
    if (!ev.target) {
      return;
    }
    let [idOfItem, typeOfItem] = ev.target.id.split("|");
    try {
      await axios.delete(
        `http://localhost:8181/api/${typeOfItem}/delete/${idOfItem}`
      );
      if (payload && payload._id === idOfItem) {
        navigate(ROUTES.LOGOUT);
        return;
      }
      let newUsersArr = JSON.parse(JSON.stringify(usersArr));
      newUsersArr = newUsersArr.filter((user) => user._id !== idOfItem);
      setUsersArr(newUsersArr);
      toast.info("user deleted");
    } catch (err) {
      handleErrorFromAxios(err, "problem deleting user right now", false);
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
  const dividerOfGridMUI = mediaQ ? 12 : 2;
  const breakPoint = "md";
  if (!usersArr || !cardsArr) {
    return <CircularProgress sx={{ color: "red" }} />;
  }
  return (
    <Container maxWidth="lg">
      {openDialogState ? (
        <DialogBox
          openStateProp={openDialogState}
          setOpenFunc={setOpenDialogState}
          title={`${
            typeOfDialog === typesOfDialog.delete
              ? "Delete"
              : typeOfDialog === typesOfDialog.auth
              ? "Revoke your authorization"
              : ""
          } ${
            typeOfDialog === typesOfDialog.auth
              ? ""
              : dialogItemState.nameOfItem
          } forever?`}
          description={
            typeOfDialog === typesOfDialog.auth
              ? "After Clicking 'confirm' - you will be logged out and will not be able to come back to use this page anymore!"
              : undefined
          }
          agreeText={
            typeOfDialog === typesOfDialog.delete
              ? "Delete"
              : typeOfDialog === typesOfDialog.auth
              ? "Continue"
              : undefined
          }
          agreeFunc={
            typeOfDialog === typesOfDialog.delete
              ? handleDeleteAfterConfirm
              : typeOfDialog === typesOfDialog.auth
              ? handleAuthClick
              : null
          }
          idOfComponent={dialogItemState.idOfItem}
        />
      ) : (
        ""
      )}
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

      {usersArr.map((user) => (
        //*user information
        <Grid
          container
          sx={{
            backgroundColor:
              payload && user._id === payload._id
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
    </Container>
  );
};

export default CRMPage;
