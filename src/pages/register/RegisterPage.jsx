import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import ROUTES from "../../routes/ROUTES";
import ProfileFormComponent from "./ProfileFormComponent";
import validateRegisterSchema from "../../validations/registerValidate";
import FormButton from "../../components/FormButton";
import axios from "axios";
import { toast } from "react-toastify";
import handleErrorFromAxios from "../../utils/handleError";
import AccountEngaging from "../../components/AccountEngaging";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [genderAlert, setGenderAlert] = React.useState(false);
  const [profilePic, setProfilePic] = React.useState("");
  const [inputState, setInputState] = React.useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });
  const [inputsErrorState, setInputsErrorState] = React.useState({});
  const [gender, setGender] = React.useState("");
  const [disableBtn, setDisableBtn] = React.useState(true);
  const [alertFile, setAlertFile] = React.useState(false);
  const [fileSize, setFileSize] = React.useState(0);

  React.useEffect(() => {
    if (!gender) {
      setGenderAlert(true);
    } else {
      setGenderAlert(false);
    }
    const joiResponse = validateRegisterSchema(inputState);
    if (!joiResponse && gender && (!fileSize || fileSize < 1048576)) {
      setInputsErrorState(joiResponse);
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [gender]);
  React.useEffect(() => {
    const joiResponse = validateRegisterSchema(inputState);
    if (!joiResponse && gender && (!fileSize || fileSize < 1048576)) {
      setInputsErrorState(joiResponse);
      setDisableBtn(false);
      return;
    }
    setDisableBtn(true);
  }, [fileSize]);
  const arrayOfInputs = [
    { nameOfInput: "First Name", idAndKey: "first", isReq: true },
    { nameOfInput: "Last Name", idAndKey: "last", isReq: true },
    { nameOfInput: "Email", idAndKey: "email", isReq: false },
    { nameOfInput: "Password", idAndKey: "password", isReq: true },
  ];
  const handleRegisterClickBtn = async () => {
    const joiResponse = validateRegisterSchema(inputState);
    setInputsErrorState(joiResponse);
    if (!gender) {
      setGenderAlert(true);
      return;
    }
    if (joiResponse) {
      toast.error("fill the fields correctly please");
      return;
    }
    try {
      await axios.post("http://localhost:8181/api/users/register", {
        name: { first: inputState.first, last: inputState.last },
        email: inputState.email,
        password: inputState.password,
        gender,
        image: profilePic
          ? {
              imageFile: {
                data: profilePic,
                contentType: `image/${profilePic.split(";")[0].split("/")[1]}`,
              },
              alt: "Profile Picture",
            }
          : null,
      });
      toast.success("user registered");
      navigate(ROUTES.LOGIN);
      return false;
    } catch (err) {
      handleErrorFromAxios(
        err,
        "problem signing your user up, please try again later",
        true
      );
      return false;
    }
  };

  const handleInputChange = (ev) => {
    if (!ev.target) {
      return;
    }
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateRegisterSchema(newInputState);
    if (!joiResponse && gender && fileSize < 1048576) {
      setInputsErrorState(joiResponse);
      setDisableBtn(false);
      return;
    }
    setDisableBtn(true);
    const inputKeys = Object.keys(inputState);
    for (const key of inputKeys) {
      if (inputState && !inputState[key] && key != ev.target.id) {
        if (joiResponse[key]) {
          joiResponse[key] = "";
        }
      }
    }
    setInputsErrorState(joiResponse);
  };
  const handleGenderChange = (ev) => {
    if (!ev.target) {
      return;
    }
    setGender(ev.target.value);
  };
  const handleCancelPicBtn = () => {
    setFileSize(0);
    setAlertFile(false);
    setProfilePic("");
  };
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography fontWeight="bold" component="h1" variant="h3">
          Sign up
        </Typography>

        <Box
          component="form"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          noValidate
          sx={{ mt: 3 }}
        >
          <ProfileFormComponent
            genderProp={gender}
            inputStateProp={inputState}
            inputErrorStateProp={inputsErrorState}
            handleGenderChangeFunc={handleGenderChange}
            setAlertFileFunc={setAlertFile}
            setFileSizeFunc={setFileSize}
            setPicFunc={setProfilePic}
            profilePicProp={profilePic}
            handleCancelPicBtnFunc={handleCancelPicBtn}
            handleInputChangeFunc={handleInputChange}
            arrayOfInputsProp={arrayOfInputs}
            genderAlertProp={genderAlert}
            alertFileProp={alertFile}
          />
          <FormButton
            handleFunctionClick={handleRegisterClickBtn}
            disableBtnProp={disableBtn}
            textOfBtn="Sign Up"
          />
          <AccountEngaging isSignInOrUp={"login"} />
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
