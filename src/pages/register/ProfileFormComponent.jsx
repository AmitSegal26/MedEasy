import React from "react";
import {
  Alert,
  Avatar,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import TextFieldComponent from "../../components/textField/TextFieldComponent";
import COLORS from "../../colors/COLORS";
import {
  ImageRemoveComponent,
  ImageUploadComponent,
} from "../../components/imageUpload/ImageUploadComponent";
import femaleAvatar from "../../assets/imgs/femaleAvatarpng.jpg";
import maleAvatar from "../../assets/imgs/maleAvatar.jpg";
import otherAvatar from "../../assets/imgs/otherAvatar.jpg";

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
          enableSideIconsOnFields={true}
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
                ? maleAvatar
                : props.genderProp == "female"
                ? femaleAvatar
                : otherAvatar
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
          <ImageUploadComponent
            setAlertFileFunc={props.setAlertFileFunc}
            setFileSizeFunc={props.setFileSizeFunc}
            setPicFunc={props.setPicFunc}
          />
        ) : (
          <ImageRemoveComponent
            alertFileProp={props.alertFileProp}
            picStateProp={props.profilePicProp}
            isEditOrNotFunc={(operat) => operat}
            handleCancelPicBtnFunc={props.handleCancelPicBtnFunc}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileFormComponent;
