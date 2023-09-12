import React, { useEffect, useState } from "react";
import TextFieldComponent from "../components/textField/TextFieldComponent";
import vaildateCardScheme from "../validations/cardValidate";
import { Container, Grid, Typography } from "@mui/material";
import FormButton from "../components/FormButton";
import { toast } from "react-toastify";
import axios from "axios";
import handleErrorFromAxios from "../utils/handleError";
import {
  ImageRemoveComponent,
  ImageUploadComponent,
} from "../components/imageUpload/ImageUploadComponent";
const CreateCardPage = () => {
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
      return true;
    } catch (err) {
      handleErrorFromAxios(
        err,
        "problem uploading new card, try again later",
        true
      );
      return false;
    }
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
            <ImageUploadComponent
              setAlertFileFunc={setAlertFile}
              setFileSizeFunc={setFileSize}
              setPicFunc={setCardPic}
            />
          ) : (
            <ImageRemoveComponent
              alertFileProp={alertFile}
              picStateProp={cardPic}
              handleCancelPicBtnFunc={handleCancelPicBtn}
              isEditOrNotFunc={(operat) => operat}
            />
          )}
        </Grid>
      </Grid>
      <FormButton
        handleFunctionClick={handleAddClick}
        disableBtnProp={disableBtn}
        textOfBtn="Create Item"
      />
    </Container>
  );
};

export default CreateCardPage;
