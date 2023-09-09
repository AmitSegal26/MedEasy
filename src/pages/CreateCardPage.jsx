import React, { Fragment, useEffect, useState } from "react";
import TextFieldComponent from "../components/textField/TextFieldComponent";
import vaildateCardScheme from "../validations/cardValidate";
import { Alert, Box, Container, Grid, Typography } from "@mui/material";
import FormButton from "../components/FormButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import COLORS from "../colors/COLORS";
import { toast } from "react-toastify";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import handleErrorFromAxios from "../utils/handleError";
const CreateCardPage = () => {
  const navigate = useNavigate();
  const [cardState, setCardState] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    contains: 0,
  });
  const [inputErrorState, setInputErrorState] = useState(null);
  const [cardPic, setCardPic] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);
  const [alertFile, setAlertFile] = useState(false);
  const [fileSize, setFileSize] = useState(0);
  useEffect(() => {
    const joiResponse = vaildateCardScheme(cardState);
    if (!joiResponse && (!fileSize || fileSize < 1048576)) {
      setInputErrorState(joiResponse);
      setDisableBtn(false);
      return;
    }
    setDisableBtn(true);
  }, [fileSize]);
  const arrOfInputs = [
    { type: "title", title: "Title" },
    { type: "description", title: "Description" },
    { type: "stock", title: "Stock" },
    { type: "price", title: "Price" },
    { type: "contains", title: "Contains" },
  ];
  const handleAddClick = async () => {
    const joiResponse = vaildateCardScheme(cardState);
    setInputErrorState(joiResponse);

    if (joiResponse) {
      toast.error("fill the fields correctly please");
      return;
    }
    try {
      await axios.post("http://localhost:8181/api/cards/create", {
        title: cardState.title,
        description: cardState.description,
        price: cardState.price,
        stock: cardState.stock,
        contains: cardState.contains,
        image: cardPic
          ? {
              imageFile: {
                data: cardPic,
                contentType: `image/${cardPic.split(";")[0].split("/")[1]}`,
              },
              alt: `${cardState.title}`,
            }
          : null,
      });
      toast.success("item added");
      navigate(ROUTES.SHOP);
    } catch (err) {
      handleErrorFromAxios(
        err,
        "problem uploading new card, try again later",
        true
      );
    }
  };
  const handleFileUpload = (ev) => {
    if (!ev.target) {
      return;
    }
    let reader = new FileReader();
    reader.onload = () => {
      const file = ev.target.files[0];
      if (file.size > 1048576) {
        setAlertFile(true);
      }
      setFileSize(file.size);
      setCardPic(reader.result);
    };
    reader.readAsDataURL(ev.target.files[0]);
  };
  const handleCancelPicBtn = () => {
    setFileSize(0);
    setAlertFile(false);
    setCardPic("");
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(cardState));
    newInputState[ev.target.id] = ev.target.value;
    setCardState(newInputState);
    const joiResponse = vaildateCardScheme(newInputState);
    if (!joiResponse && fileSize < 1048576) {
      setInputErrorState(joiResponse);
      setDisableBtn(false);
      return;
    }
    setDisableBtn(true);
    const inputKeys = Object.keys(cardState);
    for (const key of inputKeys) {
      if (cardState && !cardState[key] && key != ev.target.id) {
        if (joiResponse && joiResponse[key]) {
          joiResponse[key] = "";
        }
      }
    }
    setInputErrorState(joiResponse);
  };
  return (
    <Container maxWidth="lg">
      <Typography
        sx={{ marginBlock: 8 }}
        fontWeight="bold"
        component="h1"
        variant="h3"
      >
        Create a Card
      </Typography>

      <Grid container spacing={2}>
        {arrOfInputs.map((input) => (
          <TextFieldComponent
            key={input.type}
            inputName={input.title}
            inputType={input.type}
            inputValue={cardState[input.type]}
            inputChange={handleInputChange}
            inputErrors={inputErrorState}
            isRequired={true}
            disabledProp={false}
            enableSideIconsOnFields={true}
            isForCreateProduct={true}
          />
        ))}
        <Grid item xs={12}>
          Upload a picture for your new medicine!
          {!cardPic ? (
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
              onClick={handleCancelPicBtn}
            >
              <img
                id="chosenPicture"
                src={cardPic}
                alt="Avatar"
                className={"image"}
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
              <div className={"middle"}>
                <div className={"text"}>{"Clear Profile Picture"}</div>
              </div>
            </Box>
          )}
        </Grid>
      </Grid>
      <FormButton
        handleRegisterClickBtnFunc={handleAddClick}
        disableBtnProp={disableBtn}
        textOfBtn="Create Item"
      />
    </Container>
  );
};

export default CreateCardPage;
