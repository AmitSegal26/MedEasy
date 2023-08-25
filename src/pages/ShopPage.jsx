import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IconButton,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import COLORS from "../colors/COLORS";
import makeTitle from "../utils/makeATitle";
import { useSelector } from "react-redux";
import BreakpointsInd from "../devTools/BreakpointsInd";
import DialogBox from "../components/DialogBox";
import AddIcon from "@mui/icons-material/Add";
import handleErrorFromAxios from "../utils/handleError";
import CardComponent from "../components/CardComponent";
const ProductsPage = () => {
  const navigate = useNavigate();
  const [displayCards, setDisplayCards] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [dialogItemState, setDialogItemState] = useState({});
  const [productsArr, setProductsArr] = useState([]);
  const [openDialogState, setOpenDialogState] = useState(false);
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        window &&
        !(
          window.scrollY >=
          document.documentElement.scrollHeight - window.innerHeight
        )
      ) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
    (async () => {
      try {
        let { data } = await axios.get(
          "http://localhost:8181/api/cards/allCards"
        );
        if (!data || !data.length) {
          toast.error(
            "no meds for sale at the moment, please come back again later!"
          );
          navigate(ROUTES.HOME);
        }
        //*adding extra cell for adding new card
        data.push({ ignore: null });
        setProductsArr(data);
      } catch (err) {
        handleErrorFromAxios(err, undefined, false);
      }
    })();
  }, []);
  const handleDeleteClick = async (ev) => {
    try {
      if (!ev) {
        toast.error("problem with ev");
        return;
      }
      if (!ev.target) {
        toast.error("problem with ev.target");
        return;
      }
      if (ev && ev.target && !ev.target.id) {
        toast.error("problem with ev.target.id");
        return;
      }
      let { id } = ev.target;
      let {
        data: { _id },
        data: { title },
      } = await axios.delete(`http://localhost:8181/api/cards/delete/${id}`);
      let newProductsArr = JSON.parse(JSON.stringify(productsArr));
      newProductsArr = newProductsArr.filter((item) => item._id != _id);
      setProductsArr(newProductsArr);
      toast.info(`${title ? title : "item"} has been deleted`);
    } catch (err) {
      handleErrorFromAxios(err, undefined, false);
    }
  };

  const handleDeleteClickBeforeConfirm = (ev) => {
    if (!ev) {
      return;
    }
    if (ev && !ev.target) {
      return;
    }
    if (ev && ev.target && !ev.target.id) {
      return;
    }
    for (let card of productsArr) {
      if (card._id == ev.target.id) {
        setDialogItemState({ id: card._id, title: card.title });
        setOpenDialogState(true);
        break;
      }
    }
  };

  const handleAddToCartClick = async (ev) => {
    try {
      if (!ev) {
        return;
      }
      if (ev && !ev.target) {
        return;
      }
      if (ev && ev.target && !ev.target.id) {
        return;
      }
      let titleOfCard = ev.target.id.split("||")[0];
      let idOfCard = ev.target.id.split("||")[1];

      if (!payload) {
        toast.warning(
          `Before adding '${makeTitle(
            titleOfCard
          )}' to your cart, you should login to your account!`
        );
        navigate(ROUTES.LOGIN);
        return;
      }
      let {
        data: { data },
        data: { addedToCart },
      } = await axios.patch("http://localhost:8181/api/cards/cart/" + idOfCard);
      if (!data) {
        return;
      }
      let newProductsArr = JSON.parse(JSON.stringify(productsArr));
      for (let i = 0; i < newProductsArr.length; i++) {
        if (newProductsArr[i]._id == data._id) {
          newProductsArr[i] = { ...data };
        }
      }
      setProductsArr(newProductsArr);
      if (addedToCart) {
        toast.success(`${makeTitle(data.title)} has been added to cart`);
      } else {
        toast.info(`${makeTitle(data.title)} has been removed from cart`);
      }
    } catch (err) {
      handleErrorFromAxios(
        err,
        "problem adding the item to the cart, please try again later",
        false
      );
    }
  };

  const handleCardClick = (ev) => {
    if (!ev) {
      return;
    }
    if (ev && !ev.target) {
      return;
    }
    if (ev && ev.target && !ev.target.id) {
      return;
    }
    navigate(`${ROUTES.SPECIFICPRODUCT}/${ev.target.id}`);
  };
  const handleEditClick = (ev) => {
    if (!ev) {
      return;
    }
    if (ev && !ev.target) {
      return;
    }
    if (ev && ev.target && !ev.target.id) {
      return;
    }
    navigate(`${ROUTES.EDIT}/${ev.target.id}`);
  };

  const handleCreateCardClick = () => {
    navigate(ROUTES.CREATE);
  };

  const handleScrollToExtraCardClick = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  if (!productsArr.length) {
    return <CircularProgress />;
  }
  return (
    <Container maxWidth="lg">
      {payload && payload.isAdmin && showTopBtn ? (
        <Button
          sx={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            zIndex: 9999,
          }}
          variant="contained"
          onClick={handleScrollToExtraCardClick}
        >
          Add a new Card
        </Button>
      ) : (
        ""
      )}
      <DialogBox
        idOfComponent={dialogItemState.id}
        openStateProp={openDialogState}
        setOpenFunc={setOpenDialogState}
        title={`Delete '${makeTitle(dialogItemState.title)}'?`}
        description={`Are you sure you want to delete '${makeTitle(
          dialogItemState.title
        )}'? This action would be non-reversible!`}
        agreeText={"Delete"}
        colorOfAgreeBtn="success"
        colorOfDisagreeBtn="error"
        agreeFunc={handleDeleteClick}
      />
      <Grid container spacing={2}>
        {productsArr.map((item) =>
          !item.hasOwnProperty("ignore") ? (
            <CardComponent
              key={item.title}
              cardProp={item}
              payloadProp={payload}
              handleCardClickFunc={handleCardClick}
              handleAddToCartClickFunc={handleAddToCartClick}
              handleDeleteClickBeforeConfirmFunc={
                handleDeleteClickBeforeConfirm
              }
              handleEditClickFunc={handleEditClick}
            />
          ) : payload && payload.isAdmin ? (
            <Grid item xs={12} sm={6} md={4} key="extraCard">
              <Card
                onClick={handleCreateCardClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  backgroundColor: COLORS.BACKGROUND,
                  border: "0.05rem solid black",
                  height: { xs: "200px", sm: "790px", lg: "650px" },
                  p: 2,
                  transition: "0.2s all cubic-bezier(0.25, 0.1, 0.75, 0.3)",
                  cursor: "pointer",
                  ":hover": {
                    boxShadow: `inset 0px 0px 0px 6px ${COLORS.MAIN}`,
                    backgroundColor: COLORS.TEXT2,
                  },
                }}
              >
                <AddIcon
                  onClick={handleCreateCardClick}
                  sx={{ fontSize: "20rem", color: "#4099ff" }}
                />
              </Card>
            </Grid>
          ) : (
            ""
          )
        )}
      </Grid>
      <BreakpointsInd />
    </Container>
  );
};

export default ProductsPage;
