import {
  Alert,
  Avatar,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import TextFieldComponent from "./TextFieldComponent";
import COLORS from "../colors/COLORS";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "../pages/registerPage.css";

const ProfileFormComponent = (props) => {
  return (
    <Grid container spacing={2}>
      {props.arrayOfInputsProp.map((input, i) => (
        <TextFieldComponent
          key={input.idAndKey}
          inputName={input.nameOfInput}
          inputType={input.idAndKey}
          inputValue={
            props.inputStateProp[input.idAndKey]
              ? props.inputStateProp[input.idAndKey]
              : ""
          }
          inputChange={props.handleInputChangeFunc}
          inputErrors={props.inputErrorStateProp}
          isRequired={input.isReq}
          enableSideIconsOnFields={props.enableSideIconsOnFieldsProp}
        />
      ))}
      <Grid item xs={9}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.genderProp}
            label="Gender"
            onChange={props.handleGenderChangeFunc}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <Avatar
          sx={{ margin: "0.5rem" }}
          src={
            props.genderProp
              ? props.genderProp == "male"
                ? props.maleAvatarProp
                : props.genderProp == "female"
                ? props.femaleAvatarProp
                : props.otherAvatarProp
              : "#"
          }
          alt={
            props.genderProp
              ? props.genderProp == "male"
                ? "male avatar"
                : props.genderProp == "female"
                ? "female avatar"
                : "other gender avatar"
              : "?"
          }
        />
      </Grid>
      <Grid item xs={12}>
        {props.genderAlertProp ? (
          <Alert severity="info">Please pick a gender before signing up</Alert>
        ) : (
          ""
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" color={COLORS.TEXT1}>
          Let Us Know What You Look Like!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        Upload a Profile Picture
        {!props.profilePicProp ? (
          <Fragment>
            <input
              type="file"
              id="inputFileProfilePic"
              onChange={props.handleFileUploadFunc}
              hidden={true}
              accept=".jpg,.png,.jpeg,.gif"
            />
            <br />
            <br />
            <label htmlFor="inputFileProfilePic">
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
          <div className="container" onClick={props.handleCancelPicBtnFunc}>
            <img
              id="chosenPicture"
              src={props.profilePicProp}
              alt="Avatar"
              className="image"
              style={{
                width: "100%",
                maxHeight: "30vh",
              }}
            />
            <div className="middle">
              <div className="text">Clear Profile Picture</div>
            </div>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileFormComponent;
