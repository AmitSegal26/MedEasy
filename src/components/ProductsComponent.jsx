import {
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SortFilterDisplayComp from "./SortFilterDisplayComp";
import DialogBox from "./DialogBox";
import makeTitle from "../utils/makeATitle";
import CardComponent from "./CardComponent";
import COLORS from "../colors/COLORS";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AddIcon from "@mui/icons-material/Add";
import ListComponent from "./ListComponent";
import useReadCard from "../hooks/useReadCard";
import useEditCard from "../hooks/useEditCard";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import handleErrorFromAxios from "../utils/handleError";
import "../pages/shopPage.css";

const ProductsComponent = ({
  productsArrProp,
  payloadProp,
  setOriginalCardsArrFunc,
  originalCardsArrProp,
  setProductsArrFunc,
}) => {
  const readCard = useReadCard();
  const editCard = useEditCard();
  const navigate = useNavigate();
  const [isDisplayAsCardsStateLoaded, setIsDisplayAsCardsStateLoaded] =
    useState(false);
  const [dialogItemState, setDialogItemState] = useState({});
  const [openDialogState, setOpenDialogState] = useState(false);
  const [displayAsCards, setDisplayAsCards] = useState(true);
  const [showExtraBtn, setShowExtraBtn] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [ascOrDesc, setAscOrDesc] = useState(null);
  const [isStockFiltered, setIsStockFiltered] = useState(false);
  useEffect(() => {
    let displayAsCardsFromLocalStorage = localStorage.getItem("displayAsCards");
    if (
      displayAsCardsFromLocalStorage != null ||
      displayAsCardsFromLocalStorage != undefined
    ) {
      displayAsCardsFromLocalStorage =
        displayAsCardsFromLocalStorage == "true" ? true : false;
      setDisplayAsCards(!!displayAsCardsFromLocalStorage);
    }
    window.addEventListener("scroll", () => {
      if (
        window &&
        !(
          window.scrollY >=
          document.documentElement.scrollHeight - window.innerHeight
        )
      ) {
        setShowExtraBtn(true);
      } else {
        setShowExtraBtn(false);
      }
    });
    window.addEventListener("scroll", () => {
      if (window && !(window.scrollY <= 250)) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
    //*the command below is for the button to appear due to listening to a scrolling event
    scrollDownABit();
  }, []);
  useEffect(() => {
    if (originalCardsArrProp && !originalCardsArrProp.length) {
      return;
    }

    if (ascOrDesc == "asc") {
      let newCardsArr = JSON.parse(JSON.stringify(originalCardsArrProp));
      newCardsArr = newCardsArr.sort((a, b) => a.price - b.price);
      if (isStockFiltered) {
        setProductsArrFunc(filterArrayFunc(newCardsArr));
      } else {
        setProductsArrFunc(newCardsArr);
      }
    } else if (ascOrDesc == "desc") {
      let newCardsArr = JSON.parse(JSON.stringify(originalCardsArrProp));
      newCardsArr = newCardsArr.sort((a, b) => b.price - a.price);
      if (isStockFiltered) {
        setProductsArrFunc(filterArrayFunc(newCardsArr));
      } else {
        setProductsArrFunc(newCardsArr);
      }
    } else if (ascOrDesc == "ascRate") {
      let newCardsArr = JSON.parse(JSON.stringify(originalCardsArrProp));
      newCardsArr = newCardsArr.sort((a, b) => {
        const ratingA =
          a.rating && a.rating.ratingUsers && a.rating.ratingUsers.length
            ? a.rating.ratingTotalScore / a.rating.ratingUsers.length
            : null;
        const ratingB =
          b.rating && b.rating.ratingUsers && b.rating.ratingUsers.length
            ? b.rating.ratingTotalScore / b.rating.ratingUsers.length
            : null;

        if (ratingA === null && ratingB === null) {
          return null;
        } else if (ratingA === null) {
          return 1; // Put items with null rating at the end
        } else if (ratingB === null) {
          return -1; // Put items with null rating at the end
        }

        return ratingA - ratingB || a.price - b.price;
      });
      if (isStockFiltered) {
        setProductsArrFunc(filterArrayFunc(newCardsArr));
      } else {
        setProductsArrFunc(newCardsArr);
      }
    } else if (ascOrDesc == "descRate") {
      let newCardsArr = JSON.parse(JSON.stringify(originalCardsArrProp));
      newCardsArr = newCardsArr.sort((a, b) => {
        const ratingA =
          a.rating && a.rating.ratingUsers && a.rating.ratingUsers.length
            ? a.rating.ratingTotalScore / a.rating.ratingUsers.length
            : null;
        const ratingB =
          b.rating && b.rating.ratingUsers && b.rating.ratingUsers.length
            ? b.rating.ratingTotalScore / b.rating.ratingUsers.length
            : null;

        if (ratingA === null && ratingB === null) {
          return null;
        } else if (ratingA === null) {
          return 1; // Put items with null rating at the end
        } else if (ratingB === null) {
          return -1; // Put items with null rating at the end
        }

        return ratingB - ratingA || b.price - a.price;
      });
      if (isStockFiltered) {
        setProductsArrFunc(filterArrayFunc(newCardsArr));
      } else {
        setProductsArrFunc(newCardsArr);
      }
    } else {
      let newCardsArr = JSON.parse(JSON.stringify(originalCardsArrProp));
      if (isStockFiltered) {
        setProductsArrFunc(filterArrayFunc(newCardsArr));
      } else {
        setProductsArrFunc(newCardsArr);
      }
    }
  }, [originalCardsArrProp, isStockFiltered, ascOrDesc]);

  /*
   * without making sure that the [displayAsCards] has recieved a value
   * the screen will glitch the cards display first.
   * this useEffect sets a value for a state indicating whether the
   * [displayAsCards] state has recieved a value from localStorage or not
   ! USAGE OF STATE IN LINE 346
   */
  useEffect(() => {
    if (displayAsCards === false || displayAsCards === true) {
      setIsDisplayAsCardsStateLoaded(true);
    }
    //*the command below is for the button to appear due to listening to a scrolling event
    scrollDownABit();
  }, [displayAsCards]);
  const filterOnStock = () => {
    if (!originalCardsArrProp) {
      return;
    }
    setIsStockFiltered(!isStockFiltered);
  };

  const filterArrayFunc = (arrayToBeFiltered) => {
    if (isStockFiltered) {
      let newCardsArr = JSON.parse(JSON.stringify(arrayToBeFiltered));
      newCardsArr = newCardsArr.filter((card) => card && card.stock != 0);
      return newCardsArr;
    } else {
      let newCardsArr = JSON.parse(JSON.stringify(arrayToBeFiltered));
      return newCardsArr;
    }
  };
  const sortRateASC = () => {
    setAscOrDesc("ascRate");
  };
  const sortRateDESC = () => {
    setAscOrDesc("descRate");
  };
  const sortASC = () => {
    setAscOrDesc("asc");
  };
  const sortDESC = () => {
    setAscOrDesc("desc");
  };
  const removeSort = () => {
    setAscOrDesc("remove");
  };
  const scrollDownABit = () => {
    window.scrollTo({
      top: 1,
      behavior: "smooth",
    });
  };
  const handleChangeDisplayModeToNormal = () => {
    setDisplayAsCards(true);
    localStorage.setItem("displayAsCards", true);
  };
  const handleChangeDisplayModeToList = () => {
    setDisplayAsCards(false);
    localStorage.setItem("displayAsCards", false);
  };
  const handleCardClick = (ev) => {
    readCard(ev);
  };
  const handleEditClick = (ev) => {
    editCard(ev);
  };
  const handleCreateCardClick = () => {
    navigate(ROUTES.CREATE);
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

      if (!payloadProp) {
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
      let newProductsArr = JSON.parse(JSON.stringify(originalCardsArrProp));
      for (let i = 0; i < newProductsArr.length; i++) {
        if (newProductsArr[i]._id == data._id) {
          newProductsArr[i] = { ...data };
        }
      }
      setOriginalCardsArrFunc(newProductsArr);
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
      let newProductsArr = JSON.parse(JSON.stringify(originalCardsArrProp));
      newProductsArr = newProductsArr.filter((item) => item._id != _id);
      setOriginalCardsArrFunc(newProductsArr);
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
    for (let card of productsArrProp) {
      if (card._id == ev.target.id) {
        setDialogItemState({ id: card._id, title: card.title });
        setOpenDialogState(true);
        break;
      }
    }
  };
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleScrollToExtraCardClick = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  if (!isDisplayAsCardsStateLoaded) {
    return <CircularProgress />;
  }
  return (
    <Container maxWidth="lg">
      {payloadProp && payloadProp.isAdmin && showExtraBtn ? (
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
          Add a new product
        </Button>
      ) : (
        ""
      )}
      {showTopBtn ? (
        <Button
          sx={{
            position: "fixed",
            bottom: "30px",
            left: "30px",
            zIndex: 9999,
          }}
          variant="contained"
          onClick={handleScrollToTop}
        >
          <ArrowUpwardIcon />
        </Button>
      ) : (
        ""
      )}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="h6" color="primary" align="center">
            Filter
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" color="primary" align="center">
            Sort
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" color="secondary" align="center">
            Display
          </Typography>
        </Grid>
      </Grid>
      <SortFilterDisplayComp
        isStockFilteredProp={isStockFiltered}
        filterOnStockFunc={filterOnStock}
        sortDESCFunc={sortDESC}
        sortASCFunc={sortASC}
        sortRateDESCFunc={sortRateDESC}
        sortRateASCFunc={sortRateASC}
        sortStateProp={ascOrDesc}
        removeSortFunc={removeSort}
        handleChangeDisplayModeToNormalFunc={handleChangeDisplayModeToNormal}
        handleChangeDisplayModeToListFunc={handleChangeDisplayModeToList}
        displayAsCardsStateProp={displayAsCards}
      />
      <DialogBox
        idOfComponent={dialogItemState.id}
        openStateProp={openDialogState}
        setOpenFunc={setOpenDialogState}
        title={`Delete the item '${makeTitle(dialogItemState.title)}'?`}
        description={`Are you sure you want to delete '${makeTitle(
          dialogItemState.title
        )}'? This action would be non-reversible!`}
        agreeText={"Delete"}
        colorOfAgreeBtn="success"
        colorOfDisagreeBtn="error"
        agreeFunc={handleDeleteClick}
      />
      {displayAsCards ? (
        <Grid container spacing={2}>
          {productsArrProp.map((item) => (
            <CardComponent
              key={item._id + Date.now()}
              cardProp={item}
              payloadProp={payloadProp}
              handleCardClickFunc={handleCardClick}
              handleAddToCartClickFunc={handleAddToCartClick}
              handleDeleteClickBeforeConfirmFunc={
                handleDeleteClickBeforeConfirm
              }
              handleEditClickFunc={handleEditClick}
            />
          ))}{" "}
          {payloadProp && payloadProp.isAdmin ? (
            <Grid item xs={12} sm={6} md={4} key="extraCard">
              <Card
                className="extra-card"
                onClick={handleCreateCardClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  backgroundColor: COLORS.BACKGROUND,
                  border: "0.5rem solid black",
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
          )}
        </Grid>
      ) : (
        <List>
          {productsArrProp.map((item) => (
            <ListComponent
              key={item._id + Date.now()}
              cardProp={item}
              payloadProp={payloadProp}
              handleCartBtnClickFunc={handleAddToCartClick}
              handleDeleteFromInitialCardsArrFunc={
                handleDeleteClickBeforeConfirm
              }
              handleEditFromInitialCardsArrFunc={handleEditClick}
              handleImageToShowDataFunc={handleCardClick}
            />
          ))}
          {payloadProp && payloadProp.isAdmin ? (
            <Tooltip title="add a new card" key="extraListItem">
              <ListItem
                onClick={handleCreateCardClick}
                className="extra-card"
                sx={{
                  cursor: "pointer",
                  p: 1,
                  marginBlock: 1,
                  justifyContent: "space-evenly",
                  borderRadius: "10px",
                  transition: "all 0.2s cubic-bezier(0.12,0.8,1,0.6)",
                  ":hover": {
                    backgroundColor: COLORS.SECONDARY,
                  },
                }}
              >
                <AddIcon
                  color="success"
                  sx={{
                    transform: "scale(4,1.3)",
                    fontSize: "10rem",
                    color: "#4099ff",
                  }}
                />
              </ListItem>
            </Tooltip>
          ) : (
            ""
          )}
        </List>
      )}
    </Container>
  );
};

export default ProductsComponent;
