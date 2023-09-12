import React, { useEffect, useState } from "react";
import TextFieldComponent from "../components/textField/TextFieldComponent";
import vaildateCardScheme from "./../validations/cardValidate";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import FormButton from "../components/FormButton";
import { toast } from "react-toastify";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { useNavigate, useParams } from "react-router-dom";
import makeALegitStringForImage from "../utils/makeALegitStringForImage";
import makeTitle from "../utils/makeATitle";
import validateIdSchema from "../validations/idValidate";
import handleErrorFromAxios from "../utils/handleError";
import {
  ImageRemoveComponent,
  ImageUploadComponent,
} from "../components/imageUpload/ImageUploadComponent";
const EditCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardState, setCardState] = useState(null);
  const [originalTitle, setOriginalTitle] = useState("");
  const [userIdOfCard, setUserIdOfCard] = useState("");
  const [inputErrorState, setInputErrorState] = useState(null);
  const [cardPic, setCardPic] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [alertFile, setAlertFile] = useState(false);
  const [fileSize, setFileSize] = useState(0);
  useEffect(() => {
    if (validateIdSchema(id)) {
      navigate(ROUTES.HOME);
      return;
    }
    let dfltMsg = "error display cards info, try again later";
    (async () => {
      try {
        let { data } = await axios.get(
          "http://localhost:8181/api/cards/card/" + id
        );
        if (!data) {
          toast.error(dfltMsg);
          navigate(ROUTES.HOME);
        }
        let newCardData = JSON.parse(JSON.stringify(data));
        setCardPic(makeALegitStringForImage(newCardData));
        setUserIdOfCard(newCardData.user_id);
        setOriginalTitle(newCardData.title);
        delete newCardData.image;
        delete newCardData.__v;
        delete newCardData.cart;
        delete newCardData.rating;
        delete newCardData.user_id;
        delete newCardData.createdAt;
        delete newCardData._id;
        setCardState(newCardData);
        if (!vaildateCardScheme(newCardData)) {
          setDisableBtn(false);
        }
      } catch (err) {
        handleErrorFromAxios(
          err,
          "error display cards info, try again later",
          true
        );
      }
    })();
  }, [id]);
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
      await axios.put("http://localhost:8181/api/cards/edit/" + id, {
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
        user_id: userIdOfCard,
      });
      toast.success(`${cardState.title} edited!`);
    } catch (err) {
      handleErrorFromAxios(err, undefined, true);
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
  if (!cardState) {
    return <CircularProgress />;
  }
  return (
    <Container maxWidth="lg">
      <Typography
        sx={{ marginBlock: 8 }}
        fontWeight="bold"
        component="h1"
        variant="h3"
      >
        Edit '{makeTitle(originalTitle)}'
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
              isEditOrNotFunc={(operat) => operat}
              handleCancelPicBtnFunc={handleCancelPicBtn}
            />
          )}
        </Grid>
      </Grid>
      <FormButton
        handleFunctionClick={handleAddClick}
        disableBtnProp={disableBtn}
        textOfBtn="Save Changes"
      />
    </Container>
  );
};

export default EditCardPage;
