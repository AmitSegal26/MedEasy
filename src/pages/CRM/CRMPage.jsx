import React, { useEffect, useState } from "react";
import handleErrorFromAxios from "../../utils/handleError";
import axios from "axios";
import { Button, CircularProgress, Container } from "@mui/material";
import DialogBox from "../../components/DialogBox";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { useSelector } from "react-redux";
import UsersListComponent from "./UsersListComponent";
import CardsListComponent from "./CardsListComponent";

const CRMPage = () => {
  const navigate = useNavigate();
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  const [isDisplayUsers, setIsDisplayUsers] = useState(true);
  const [openDialogState, setOpenDialogState] = useState(false);
  const [typeOfDialog, setTypeOfDialog] = useState("");
  const [dialogItemState, setDialogItemState] = useState({
    idOfItem: "",
    nameOfItem: "",
  });
  const [usersArr, setUsersArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const localStorageKey = "isDisplayUsers";
  useEffect(() => {
    let isDisplayUsers = localStorage.getItem(localStorageKey);
    if (isDisplayUsers != null || isDisplayUsers != undefined) {
      isDisplayUsers = isDisplayUsers == "true" ? true : false;
      setIsDisplayUsers(!!isDisplayUsers);
    }
    (async () => {
      try {
        let { data } = await axios.get("http://localhost:8181/api/users/users");
        setUsersArr(data);
        let { data: items } = await axios.get(
          "http://localhost:8181/api/cards/allCards"
        );
        setCardsArr(items);
      } catch (err) {
        handleErrorFromAxios(err, undefined, false);
      }
    })();
  }, []);

  //*users functions
  const typesOfDialog = {
    auth: "authorization",
    deleteUser: "delete",
    deleteCard: "delete-card",
  };
  const handleAuthClick = async (ev) => {
    if (!ev) {
      return;
    }
    if (!ev.target) {
      return;
    }
    try {
      let { data } = await axios.patch(
        `http://localhost:8181/api/users/user/${ev.target.id}`
      );
      if (payload && data && data._id === payload._id) {
        navigate(ROUTES.LOGOUT);
        return;
      }
      let newUsersArr = JSON.parse(JSON.stringify(usersArr));
      for (let i = 0; i < newUsersArr.length; i++) {
        if (newUsersArr[i]._id == data._id) {
          newUsersArr[i].isAdmin = data.isAdmin;
        }
      }
      toast.info(
        data && data.name && data.name.first + data && data.isAdmin
          ? " is now admin"
          : " is not admin anymore"
      );
      setUsersArr(newUsersArr);
    } catch (err) {
      handleErrorFromAxios(err, "problem changing authority status", false);
    }
  };
  const handleDeleteAfterConfirm = async (ev) => {
    if (!ev) {
      return;
    }
    if (!ev.target) {
      return;
    }
    let [idOfItem, typeOfItem] = ev.target.id.split("|");
    try {
      await axios.delete(
        `http://localhost:8181/api/${typeOfItem}/delete/${idOfItem}`
      );
      if (payload && payload._id === idOfItem) {
        navigate(ROUTES.LOGOUT);
        return;
      }
      if (typeOfItem === "cards") {
        let newCardsArr = JSON.parse(JSON.stringify(cardsArr));
        newCardsArr = newCardsArr.filter((user) => user._id !== idOfItem);
        setCardsArr(newCardsArr);
      } else {
        let newUsersArr = JSON.parse(JSON.stringify(usersArr));
        newUsersArr = newUsersArr.filter((user) => user._id !== idOfItem);
        setUsersArr(newUsersArr);
      }
      toast.info(typeOfItem === "cards" ? "card deleted" : "user deleted");
    } catch (err) {
      handleErrorFromAxios(err, "problem deleting user right now", false);
    }
  };
  const handleChangeDisplay = () => {
    if (isDisplayUsers) {
      setIsDisplayUsers(false);
      localStorage.setItem(localStorageKey, false);
    } else {
      setIsDisplayUsers(true);
      localStorage.setItem(localStorageKey, true);
    }
  };
  if (!usersArr || !cardsArr) {
    return <CircularProgress sx={{ color: "red" }} />;
  }
  return (
    <Container maxWidth="lg">
      <Button sx={{ mb: 2 }} variant="contained" onClick={handleChangeDisplay}>
        {`show ${isDisplayUsers ? "cards" : "users"}`}
      </Button>
      {openDialogState ? (
        <DialogBox
          openStateProp={openDialogState}
          setOpenFunc={setOpenDialogState}
          title={`${
            typeOfDialog === typesOfDialog.deleteUser ||
            typeOfDialog === typesOfDialog.deleteCard
              ? "Delete"
              : typeOfDialog === typesOfDialog.auth
              ? "Revoke your authorization"
              : ""
          } ${
            typeOfDialog === typesOfDialog.auth
              ? ""
              : dialogItemState.nameOfItem
          } forever?`}
          description={
            typeOfDialog === typesOfDialog.auth
              ? "After Clicking 'confirm' - you will be logged out and will not be able to come back to use this page anymore!"
              : undefined
          }
          agreeText={
            typeOfDialog === typesOfDialog.deleteUser ||
            typeOfDialog === typesOfDialog.deleteCard
              ? "Delete"
              : typeOfDialog === typesOfDialog.auth
              ? "Continue"
              : undefined
          }
          agreeFunc={
            typeOfDialog === typesOfDialog.deleteUser ||
            typeOfDialog === typesOfDialog.deleteCard
              ? handleDeleteAfterConfirm
              : typeOfDialog === typesOfDialog.auth
              ? handleAuthClick
              : null
          }
          idOfComponent={dialogItemState.idOfItem}
        />
      ) : (
        ""
      )}
      {isDisplayUsers ? (
        <UsersListComponent
          payloadProp={payload}
          usersArrProp={usersArr}
          setUsersArrFunc={setUsersArr}
          setDialogItemStateFunc={setDialogItemState}
          setTypeOfDialogFunc={setTypeOfDialog}
          setOpenDialogStateFunc={setOpenDialogState}
          typesOfDialogObjProp={typesOfDialog}
        />
      ) : (
        <CardsListComponent
          cardsArrProp={cardsArr}
          typesOfDialogObjProp={typesOfDialog}
          setDialogItemStateFunc={setDialogItemState}
          setTypeOfDialogFunc={setTypeOfDialog}
          setOpenDialogStateFunc={setOpenDialogState}
        />
      )}
    </Container>
  );
};

export default CRMPage;
