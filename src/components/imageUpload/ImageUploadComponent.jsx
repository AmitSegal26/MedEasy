import React, { Fragment } from "react";
import { Alert, Box } from "@mui/material";
import COLORS from "../../colors/COLORS";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
//css
import "./imageUpload.css";

const ImageUploadComponent = ({
  setAlertFileFunc,
  setFileSizeFunc,
  setPicFunc,
}) => {
  const handleFileUpload = (ev) => {
    if (!ev) {
      return;
    }
    if (!ev.target) {
      return;
    }
    let reader = new FileReader();
    reader.onload = () => {
      const file = ev.target.files[0];
      if (file.size > 1048576) {
        setAlertFileFunc(true);
      }
      setFileSizeFunc(file.size);
      setPicFunc(reader.result);
    };
    reader.readAsDataURL(ev.target.files[0]);
  };
  return (
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
  );
};

const ImageRemoveComponent = ({
  alertFileProp,
  picStateProp,
  isEditOrNotFunc,
  handleCancelPicBtnFunc,
}) => {
  return (
    <Box
      component="div"
      className="container"
      onClick={isEditOrNotFunc(handleCancelPicBtnFunc)}
    >
      <img
        id="chosenPicture"
        src={picStateProp}
        alt="Avatar"
        className={isEditOrNotFunc("image")}
        style={{
          width: "90%",
          margin: "2rem 0 2rem 0",
          borderRadius: "5%",
        }}
      />
      {alertFileProp ? (
        <Alert
          sx={{ marginTop: "0.8rem" }}
          severity="error"
          variant="outlined"
          onClose={() => {
            handleCancelPicBtnFunc();
          }}
        >
          image must be less than 1MB
        </Alert>
      ) : (
        ""
      )}
      <div className={isEditOrNotFunc("middle")}>
        <div className={isEditOrNotFunc("text")}>
          {isEditOrNotFunc("Clear Profile Picture")}
        </div>
      </div>
    </Box>
  );
};

export { ImageUploadComponent, ImageRemoveComponent };
