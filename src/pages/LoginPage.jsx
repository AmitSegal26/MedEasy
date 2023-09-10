import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import FormButton from "../components/FormButton";
import TextFieldComponent from "../components/textField/TextFieldComponent";
import validateLoginSchema from "../validations/loginValidate";
import useLoggedIn from "../hooks/useLoggedIn";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import handleErrorFromAxios from "../utils/handleError";
import AccountEngaging from "../components/AccountEngaging";

const LoginPage = () => {
  const navigate = useNavigate();
  const [disableBtn, setDisableBtn] = useState(false);
  const [inputState, setInputState] = useState({ email: "", password: "" });
  const [inputsErrorState, setinputsErrorState] = useState({});
  const loggedIn = useLoggedIn();

  const handleLoginBtn = async () => {
    try {
      const joiResponse = validateLoginSchema(inputState);
      if (joiResponse) {
        toast.error("fill in the fields correctly please");
        return;
      }
      let { data } = await axios.post("http://localhost:8181/api/users/login", {
        email: inputState.email,
        password: inputState.password,
      });
      localStorage.setItem("token", data.token);
      loggedIn();
    } catch (err) {
      handleErrorFromAxios(err, undefined, false);
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateLoginSchema(newInputState);
    if (!joiResponse) {
      setinputsErrorState(joiResponse);
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
    setinputsErrorState(joiResponse);
  };
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography fontWeight="bold" component="h1" variant="h3">
          Sign In
        </Typography>
        <Box component="span" sx={{ margin: "1.25rem" }} />
        <Typography fontWeight="bold" component="h1" variant="h4">
          Insert your details and start shopping in MedEasy!
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Box component="span" sx={{ margin: "1.25rem" }} />
          <Grid container spacing={2}>
            <TextFieldComponent
              inputName="Email"
              inputType="email"
              inputValue={inputState.email}
              inputChange={handleInputChange}
              inputErrors={inputsErrorState}
              isRequired={true}
              forLoginProp={true}
            />
            <Box component="span" sx={{ margin: "1.25rem" }} />
            <TextFieldComponent
              inputName="Password"
              inputType="password"
              inputValue={inputState.password}
              inputChange={handleInputChange}
              inputErrors={inputsErrorState}
              isRequired={true}
              forLoginProp={true}
            />
          </Grid>
          <Box component="span" sx={{ margin: "1.25rem" }} />
          <FormButton
            handleRegisterClickBtnFunc={handleLoginBtn}
            disableBtnProp={disableBtn}
            textOfBtn="Sign In"
          />
        </Box>
        <AccountEngaging isSignInOrUp="register" />
      </Box>
    </Container>
  );
};

export default LoginPage;
