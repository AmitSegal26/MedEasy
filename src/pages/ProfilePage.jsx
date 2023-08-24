import React, { Fragment, useEffect, useState } from "react";
import ProfileFormComponent from "../components/ProfileFormComponent";
import axios from "axios";
import { useSelector } from "react-redux";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Alert, Box, Button, Container, Grid, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import COLORS from "../colors/COLORS";
import "../pages/registerPage.css";
import TextFieldComponent from "../components/TextFieldComponent";
import FormButton from "../components/FormButton";
import makeALegitStringForImage from "../utils/makeALegitStringForImage";
import makeTitle from "../utils/makeATitle";
import validateEditUserSchema from "../validations/editUserValidate";
import useLoggedIn from "../hooks/useLoggedIn";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { DeleteForever } from "@mui/icons-material";
import DialogBox from "../components/DialogBox";
const ProfilePage = () => {
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  const [profileState, setProfileState] = useState({
    first: "",
    last: "",
    email: "",
  });
  const [originalProfileState, setOriginalProfileState] = useState({
    first: "",
    last: "",
    email: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [picState, setPicState] = useState("");
  const [picSize, setPicSize] = useState(0);
  const [disableBtn, setDisableBtn] = useState(true);
  const [alertFile, setAlertFile] = useState(false);
  const [inputErrors, setInputErrors] = useState(null);
  const [openDialogBox, setOpenDialogBox] = useState(false);
  useEffect(() => {
    let dfltMsg = "error display your info, try again later";
    if (!payload) {
      (async () => {
        try {
          let { data } = await axios.get(
            "http://localhost:8181/api/users/userInfo"
          );
          if (!data) {
            toast.error(dfltMsg);
            navigate(ROUTES.HOME);
          }
          normalizeUser(data);
        } catch (err) {
          toast.error(
            err
              ? err.response
                ? err.response.data
                  ? err.response.data
                  : dfltMsg
                : dfltMsg
              : dfltMsg
          );
        }
      })();
    } else {
      normalizeUser(payload);
    }
  }, []);
  useEffect(() => {
    if (!picState || picSize < 1048576) {
      setAlertFile(false);
    } else {
      setDisableBtn(true);
      return;
    }
    if (
      !validateEditUserSchema(
        normalizeUserForJoi(normalizeUserForJoi(profileState))
      ) &&
      editMode
    ) {
      setDisableBtn(false);
    }
  }, [picState, picSize]);
  useEffect(() => {
    if (!editMode) {
      setDisableBtn(true);
      return;
    }
    if (
      editMode &&
      !validateEditUserSchema(normalizeUserForJoi(profileState)) &&
      (!picState || picSize < 1048576)
    ) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [editMode]);
  const normalizeUser = (dataOfUser) => {
    if (!dataOfUser) {
      return;
    }
    let newPayload = JSON.parse(JSON.stringify(dataOfUser));
    setPicState(makeALegitStringForImage(dataOfUser));
    let { name } = newPayload;
    newPayload.first = name.first;
    newPayload.last = name.last;
    delete newPayload.image;
    delete newPayload.isAdmin;
    delete newPayload.name;
    setProfileState(newPayload);
    setOriginalProfileState(newPayload);
    setInputErrors(validateEditUserSchema(normalizeUserForJoi(newPayload)));
  };
  const normalizeUserForJoi = (user) => {
    let newUser = JSON.parse(JSON.stringify(user));
    delete newUser.gender;
    delete newUser._id;
    return newUser;
  };
  const arrayOfInputs = [
    { nameOfInput: "First Name", idAndKey: "first", isReq: true },
    { nameOfInput: "Last Name", idAndKey: "last", isReq: true },
    { nameOfInput: "Email", idAndKey: "email", isReq: false },
  ];
  const handleFileUpload = (ev) => {
    let reader = new FileReader();
    reader.onload = () => {
      const file = ev.target.files[0];
      if (file.size > 1048576) {
        setAlertFile(true);
      }
      setPicSize(file.size);
      setPicState(reader.result);
    };
    reader.readAsDataURL(ev.target.files[0]);
  };
  const handleCancelPicBtn = () => {
    setPicSize(0);
    setAlertFile(false);
    setPicState("");
  };
  const isEditOrNot = (operat) => {
    if (editMode) {
      return operat;
    } else {
      return;
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(profileState));
    newInputState[ev.target.id] = ev.target.value;
    setProfileState(newInputState);
    const joiResponse = validateEditUserSchema(
      normalizeUserForJoi(newInputState)
    );
    if (!joiResponse && picSize < 1048576) {
      setInputErrors(joiResponse);
      setDisableBtn(false);
      return;
    }
    setDisableBtn(true);
    const inputKeys = Object.keys(profileState);
    for (const key of inputKeys) {
      if (profileState && !profileState[key] && key != ev.target.id) {
        if (joiResponse[key]) {
          joiResponse[key] = "";
        }
      }
    }
    setInputErrors(joiResponse);
  };
  const handleSubmitProfileClick = async () => {
    if (
      profileState == originalProfileState &&
      payload &&
      payload.image &&
      atob(payload.image.dataStr) == picState
    ) {
      toast.warning("no changes were detected");
      return;
    }
    const joiResponse = validateEditUserSchema(
      normalizeUserForJoi(profileState)
    );
    setInputErrors(joiResponse);
    if (joiResponse) {
      toast.error("fill the fields correctly please");
      return;
    }
    try {
      await axios.put(
        `http://localhost:8181/api/users/edit/${profileState._id}`,
        {
          name: { first: profileState.first, last: profileState.last },
          email: profileState.email,
          image: picState
            ? {
                imageFile: {
                  data: picState,
                  contentType: `image/${picState.split(";")[0].split("/")[1]}`,
                },
                alt: "Profile Picture",
              }
            : null,
        }
      );
      loggedIn();
      toast.success("changes saved");
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log(err);
      if (err && !err.response) {
        toast.error(
          "ERROR, our staff will take care of it, please try again later"
        );
        return;
      }
      if (err && err.response && err.response.status == 413) {
        toast.error("image file is too large!");
      } else {
        toast.error(
          `server error: ${
            err && err.response && err.response.data && err.response.data.msg
          }`
        );
      }
    }
  };
  const handleDeleteProfileClick = async () => {
    try {
      if (!profileState) {
        return;
      }
      await axios.delete("http://localhost:8181/api/users/deleteSelf");
      toast.warning(
        `${makeTitle(
          profileState.first
        )}'s user has been deleted, you will now be logged out`
      );
      navigate(ROUTES.LOGOUT);
    } catch (err) {
      console.log("error server", err);
    }
  };
  return (
    <Container maxWidth="lg">
      <DialogBox
        openStateProp={openDialogBox}
        setOpenFunc={setOpenDialogBox}
        agreeFunc={handleDeleteProfileClick}
        title="Delete your user?"
        description="Are you sure you want to delete your user? this action is non reversible!"
      />
      <Typography
        variant="h3"
        component="h2"
        sx={{ mb: 3, fontSize: { xs: "2rem", md: "4rem" } }}
      >{`Welcome ${
        profileState.gender == "male"
          ? "Mr"
          : profileState.gender == "female"
          ? "Ms"
          : profileState.gender == "other"
          ? `Dear ${makeTitle(originalProfileState.first)}`
          : ""
      } ${makeTitle(originalProfileState.last)}`}</Typography>

      <Typography
        variant="h4"
        component="h4"
        sx={{ mb: 3, fontSize: { xs: "1rem", md: "2rem" } }}
      >
        Edit mode is{" "}
        <Box component="span" sx={{ color: editMode ? "green" : "red" }}>
          {editMode ? "active" : "inactive"}
        </Box>
      </Typography>

      <Grid container>
        <Grid item xs={12} md={6}>
          {arrayOfInputs.map((page) => (
            <Fragment key={page.nameOfInput}>
              <TextFieldComponent
                inputName={page.nameOfInput}
                inputType={page.idAndKey}
                inputValue={profileState[page.idAndKey]}
                inputChange={handleInputChange}
                inputErrors={inputErrors}
                isRequired={page.isReq}
                disabledProp={!editMode}
                enableSideIconsOnFields={true}
                forLoginProp={true}
                isForEdit={true}
              />
              <Box sx={{ mb: 3 }} />
            </Fragment>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          Upload a Profile Picture
          {(payload && !payload.image) || !picState ? (
            <Fragment>
              <input
                type="file"
                id="inputFileProfilePicProfilePage"
                onChange={handleFileUpload}
                hidden={true}
                accept=".jpg,.png,.jpeg,.gif"
              />
              <br />
              <br />
              <label htmlFor="inputFileProfilePicProfilePage">
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                  }}
                  className="actualBtnForUpload containerOfInput"
                >
                  UPLOAD
                  <CloudUploadIcon />
                </Box>
                <CloudUploadIcon
                  sx={{
                    display: { xs: "block", md: "none" },
                    margin: "auto",
                    backgroundColor: `${COLORS.SECONDARY}`,
                    borderRadius: "10%",
                    color: `${COLORS.TEXT1}`,
                    width: "10vw",
                    height: "10vw",
                    padding: "0.5rem",
                    cursor: "pointer",
                  }}
                />
              </label>
            </Fragment>
          ) : (
            <Box
              component="div"
              className="container"
              onClick={isEditOrNot(handleCancelPicBtn)}
            >
              <img
                id="chosenPicture"
                src={picState}
                alt="Avatar"
                className={isEditOrNot("image")}
                style={{
                  width: "90%",
                  margin: "2rem 0 2rem 0",
                  borderRadius: "5%",
                }}
              />
              {alertFile ? (
                <Alert
                  sx={{ marginTop: "0.8rem" }}
                  severity="error"
                  variant="outlined"
                  onClose={() => {
                    handleCancelPicBtn();
                  }}
                >
                  image must be less than 1MB
                </Alert>
              ) : (
                ""
              )}
              <div className={isEditOrNot("middle")}>
                <div className={isEditOrNot("text")}>
                  {isEditOrNot("Clear Profile Picture")}
                </div>
              </div>
            </Box>
          )}
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{
          borderRadius: "50px",
          fontWeight: "bold",
          p: 2,
          m: 2,
          width: "50%",
          color: COLORS.TEXT1,
          backgroundColor: COLORS.MAIN,
          border: `0.2rem solid ${COLORS.INVERTEDFROMMAIN}`,
          ":hover": {
            backgroundColor: COLORS.INVERTEDFROMMAIN,
            color: COLORS.SECONDARY,
          },
        }}
        onClick={() => {
          setEditMode(!editMode);
        }}
      >
        Click here to edit your profile{" "}
        <EditNoteIcon
          sx={{ ml: 3, border: 1, borderRadius: 2, fontSize: "2rem" }}
        />
      </Button>
      <Button
        variant="contained"
        sx={{
          borderRadius: "50px",
          fontWeight: "bold",
          p: 2,
          m: 2,
          width: "20%",
          color: " COLORS.TEXT1",
          backgroundColor: "#E74C3C",
          border: `0.2rem solid ${COLORS.INVERTEDFROMMAIN}`,
          ":hover": {
            backgroundColor: "#D32F2F",
            color: COLORS.SECONDARY,
          },
        }}
        onClick={() => {
          setOpenDialogBox(true);
        }}
      >
        Delete Profile{" "}
        <DeleteForever
          sx={{ ml: 3, border: 1, borderRadius: 2, fontSize: "2rem" }}
        />
      </Button>
      <FormButton
        handleRegisterClickBtnFunc={handleSubmitProfileClick}
        disableBtnProp={disableBtn}
        textOfBtn="Submit Changes"
      />
    </Container>
  );
};

export default ProfilePage;
