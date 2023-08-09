import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ROUTES from "../routes/ROUTES";
import COLORS from "../colors/COLORS";
import femaleAvatar from "../assets/imgs/femaleAvatarpng.jpg";
import maleAvatar from "../assets/imgs/maleAvatar.jpg";
import otherAvatar from "../assets/imgs/otherAvatar.jpg";
import ProfileFormComponent from "../components/ProfileFormComponent";
import validateRegisterSchema from "../validations/registerValidate";
import "./registerPage.css";
import FormButton from "../components/FormButton";
import axios from "axios";
import { toast } from "react-toastify";
import { Alert } from "@mui/material";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [genderAlert, setGenderAlert] = React.useState(false);
  const [profilePic, setProfilePic] = React.useState("");
  const [inputState, setInputState] = React.useState({
    first: "",
    last: "",
    email: "",
    password: "",
    image: {},
  });
  const [inputsErrorState, setInputsErrorState] = React.useState({});
  const [gender, setGender] = React.useState("");
  const [disableBtn, setDisableBtn] = React.useState(true);
  const [alertFile, setAlertFile] = React.useState(false);
  const [fileSize, setFileSize] = React.useState(0);
  React.useEffect(() => {
    setInputState({
      first: "",
      last: "",
      email: "",
      password: "",
      image: {},
    });
  }, []);

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
    } catch (err) {
      if (err && !err.response) {
        toast.error(
          "ERROR, our staff will take care of it, please try again later"
        );
        return;
      }
      console.log(err);
      if (err && err.response && err.response.status == 413) {
        toast.error("image file is too large!");
      } else {
        toast.error(
          `server error ${
            err && err.response && err.response.data && err.response.data.msg
          }`
        );
      }
    }
  };

  const handleInputChange = (ev) => {
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
    setGender(ev.target.value);
  };
  const handleFileUpload = (ev) => {
    let reader = new FileReader();
    reader.onload = () => {
      const file = ev.target.files[0];
      if (file.size > 1048576) {
        setAlertFile(true);
      }
      setFileSize(file.size);
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(ev.target.files[0]);
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
            maleAvatarProp={maleAvatar}
            femaleAvatarProp={femaleAvatar}
            otherAvatarProp={otherAvatar}
            inputStateProp={inputState}
            inputErrorStateProp={inputsErrorState}
            handleGenderChangeFunc={handleGenderChange}
            handleFileUploadFunc={handleFileUpload}
            profilePicProp={profilePic}
            handleCancelPicBtnFunc={handleCancelPicBtn}
            handleInputChangeFunc={handleInputChange}
            arrayOfInputsProp={arrayOfInputs}
            genderAlertProp={genderAlert}
            enableSideIconsOnFieldsProp={true}
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
          <FormButton
            handleRegisterClickBtnFunc={handleRegisterClickBtn}
            disableBtnProp={disableBtn}
            textOfBtn="Sign Up"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                to={ROUTES.LOGIN}
                style={{ color: `${COLORS.TEXT2}` }}
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
