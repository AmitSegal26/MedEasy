import { Alert, Grid, InputAdornment, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import generateRandomPassword from "../utils/generatePassword";
import EditIcon from "@mui/icons-material/Edit";
import "../pages/registerPage.css";
const TextFieldComponent = ({
  inputName,
  inputType,
  inputValue,
  inputChange,
  inputErrors,
  isRequired,
  disabledProp,
  enableSideIconsOnFields,
  forLoginProp,
  isForEdit,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [randPass, setRandPass] = useState("");
  const [isRandPass, setIsRandPass] = useState(false);
  const handleVisiblity = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const onInputChange = (ev) => {
    setIsRandPass(false);
    inputChange(ev);
  };
  const handleGenerateClick = () => {
    let randomGeneratedPassword = generateRandomPassword();
    inputChange({ target: { id: "password", value: randomGeneratedPassword } });
    setIsPasswordVisible(true);
    setIsRandPass(true);
    setRandPass(randomGeneratedPassword);
  };
  return (
    <Grid item sm={forLoginProp ? 12 : 6} xs={12}>
      <TextField
        type={
          inputType == "password" && !isPasswordVisible ? "password" : "text"
        }
        error={inputErrors && inputErrors[inputType] ? true : false}
        variant="filled"
        fullWidth
        sx={{ backgroundColor: disabledProp ? "" : "white" }}
        required={isRequired}
        id={inputType}
        label={inputName}
        name={inputType}
        autoComplete={inputType}
        value={isRandPass ? randPass : inputValue}
        onChange={onInputChange}
        disabled={disabledProp}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={handleVisiblity}>
              {isForEdit && !disabledProp ? (
                <EditIcon />
              ) : inputType == "password" ? (
                isPasswordVisible ? (
                  <VisibilityIcon className="passwordVisibleEye" />
                ) : (
                  <VisibilityOffIcon className="passwordVisibleEye" />
                )
              ) : (
                ""
              )}
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position="start">
              {enableSideIconsOnFields ? (
                inputType == "password" ? (
                  <Tooltip
                    title="generate new password"
                    onClick={handleGenerateClick}
                  >
                    <KeyIcon className="passwordVisibleEye" />
                  </Tooltip>
                ) : inputType == "email" ? (
                  <EmailIcon />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </InputAdornment>
          ),
        }}
        helperText={
          inputErrors &&
          inputErrors[inputType] &&
          inputErrors[inputType].map(
            (item) =>
              item &&
              !item.includes("is not allowed to be empty") && (
                <b key={item + Date.now()}>{item}</b>
              )
          )
        }
      />
      {/* {inputErrors &&
        inputErrors[inputType] &&
        !inputErrors[inputType].find(
          (item) => item && item.includes("is not allowed to be empty")
        ) && (
          <Alert variant="filled" severity="error" sx={{ marginTop: "0.2rem" }}>
            {inputErrors[inputType].map((item) => (
              <div key={inputType + "-errors" + item}>{item}</div>
            ))}
          </Alert>
        )} */}
    </Grid>
  );
};

TextFieldComponent.defaultProps = {
  disabledProp: false,
  enableSideIconsOnFields: false,
  forLoginProp: false,
  isForEdit: false,
};

export default TextFieldComponent;
