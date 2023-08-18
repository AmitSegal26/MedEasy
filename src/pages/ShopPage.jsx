import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import COLORS from "../colors/COLORS";
import makeALegitStringForImage from "../utils/makeALegitStringForImage";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PreviewIcon from "@mui/icons-material/Preview";
import makeTitle from "../utils/makeATitle";
import RateSpecificProduct from "./specificProduct/RateSpecificProduct";
import { useSelector } from "react-redux";
import BreakpointsInd from "../devTools/BreakpointsInd";
import DialogBox from "../components/DialogBox";
import AddIcon from "@mui/icons-material/Add";
const ProductsPage = () => {
  const mediaQ = useMediaQuery("(max-width:1200px)");
  const navigate = useNavigate();
  const [dialogItemState, setDialogItemState] = useState({});
  const [productsArr, setProductsArr] = useState([]);
  const [openDialogState, setOpenDialogState] = useState(false);
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  useEffect(() => {
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
        data.push({ ignore: null });
        setProductsArr(data);
      } catch (err) {
        toast.error("something wrong, try again later");
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
      if (
        (err && !err.response) ||
        (err && !err.response.data) ||
        (err && err.response && !err.response.data)
      ) {
        toast.error(
          "problem with server, our staff will take care of it as soon as possible."
        );
        return;
      }
      toast.error(
        err.response.data.msg == "please provide token"
          ? "log in"
          : err.response.data.msg
      );
    }
  };

  const handleDeleteClickBeforeConfirm = (ev) => {
    if (ev && !ev.target) {
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
      if (!ev || !ev.target) {
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
      }
      let { data } = await axios.patch(
        "http://localhost:8181/api/cards/cart/" + idOfCard
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCardClick = (ev) => {
    navigate(`${ROUTES.SPECIFICPRODUCT}/${ev.target.id}`);
  };
  const handleEditClick = (ev) => {
    navigate(`${ROUTES.EDIT}/${ev.target.id}`);
  };

  const handleCreateCardClick = () => {
    navigate(ROUTES.CREATE);
  };
  if (!productsArr.length) {
    return <CircularProgress />;
  }
  return (
    <Container maxWidth="lg">
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
            <Grid item xs={12} sm={6} md={4} key={item.title}>
              <Card
                sx={{
                  backgroundColor: COLORS.SECONDARY,
                  border: "0.05rem solid black",
                  height: "650px",
                  p: 2,
                }}
              >
                <CardHeader title={makeTitle(item.title)} />
                <CardActionArea>
                  <CardMedia
                    id={item._id}
                    sx={{ borderRadius: 1 }}
                    component="img"
                    height="250"
                    alt={item.image.alt || "Default Image Of Meds"}
                    image={makeALegitStringForImage(item)}
                    onClick={handleCardClick}
                  />
                </CardActionArea>
                <CardContent
                  sx={{
                    height: "85px",
                    marginBlock: 3,
                    overflowY: "scroll",
                  }}
                >
                  {makeTitle(item.description)}
                </CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {item &&
                    item.rating &&
                    item.rating.ratingUsers &&
                    item.rating.hasOwnProperty("ratingTotalScore") ? (
                      item.rating.ratingTotalScore == 0 ? (
                        <RateSpecificProduct
                          forShopPage={true}
                          payloadProp={payload}
                          numOfStarsProp={0}
                        />
                      ) : (
                        <RateSpecificProduct
                          forShopPage={true}
                          payloadProp={payload}
                          numOfStarsProp={Math.floor(
                            item.rating.ratingTotalScore /
                              item.rating.ratingUsers.length
                          )}
                        />
                      )
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={6} lg={payload && payload.isAdmin ? 3 : 6}>
                    <Tooltip
                      enterDelay={500}
                      disableHoverListener={!mediaQ}
                      title="add item to cart"
                    >
                      <Button
                        id={item.title + "||" + item._id}
                        fullWidth={mediaQ}
                        sx={{ p: 1, m: 1, height: "80px" }}
                        variant="contained"
                        color="success"
                        onClick={handleAddToCartClick}
                      >
                        <Box
                          id={item.title + "||" + item._id}
                          component="p"
                          sx={{ display: { xs: "none", lg: "block" } }}
                        >
                          Add To Cart
                        </Box>
                        <AddShoppingCartIcon
                          id={item.title + "||" + item._id}
                          sx={{
                            display: { xs: "inline", lg: "none" },
                            fontSize: "2.5rem",
                          }}
                        />
                      </Button>
                    </Tooltip>
                  </Grid>

                  {payload && payload.isAdmin ? (
                    <Grid item xs={6} lg={3}>
                      <Tooltip
                        id={item._id}
                        enterDelay={500}
                        disableHoverListener={!mediaQ}
                        title="delete item"
                      >
                        <Button
                          id={item._id}
                          onClick={handleDeleteClickBeforeConfirm}
                          fullWidth={mediaQ}
                          sx={{ p: 1, m: 1, height: "80px" }}
                          variant="contained"
                          color="error"
                        >
                          <Box
                            id={item._id}
                            component="p"
                            sx={{ display: { xs: "none", lg: "block" } }}
                          >
                            Delete Item
                          </Box>
                          <DeleteForeverIcon
                            id={item._id}
                            sx={{
                              display: { xs: "inline", lg: "none" },
                              fontSize: "2.5rem",
                            }}
                          />
                        </Button>
                      </Tooltip>
                    </Grid>
                  ) : (
                    ""
                  )}
                  <Grid item xs={6} lg={payload && payload.isAdmin ? 3 : 6}>
                    <Tooltip
                      enterDelay={500}
                      disableHoverListener={!mediaQ}
                      title="read more"
                    >
                      <Button
                        fullWidth={mediaQ}
                        variant="contained"
                        color="info"
                        onClick={handleCardClick}
                        id={item._id}
                        sx={{
                          p: 1,
                          m: 1,
                          height: "80px",
                        }}
                      >
                        <Box
                          id={item._id}
                          component="p"
                          sx={{ display: { xs: "none", lg: "block" } }}
                        >
                          Read more
                        </Box>
                        <PreviewIcon
                          id={item._id}
                          sx={{
                            display: { xs: "inline", lg: "none" },
                            fontSize: "2.5rem",
                          }}
                        />
                      </Button>
                    </Tooltip>
                  </Grid>
                  {payload && payload.isAdmin ? (
                    <Grid item xs={6} lg={3}>
                      <Tooltip
                        id={item._id}
                        enterDelay={500}
                        disableHoverListener={!mediaQ}
                        title="edit item"
                      >
                        <Button
                          id={item._id}
                          onClick={handleEditClick}
                          fullWidth={mediaQ}
                          sx={{ p: 1, m: 1, height: "80px" }}
                          variant="contained"
                          color="warning"
                        >
                          <Box
                            id={item._id}
                            component="p"
                            sx={{ display: { xs: "none", lg: "block" } }}
                          >
                            Edit Item
                          </Box>
                          <EditNoteIcon
                            id={item._id}
                            sx={{
                              display: { xs: "inline", lg: "none" },
                              fontSize: "2.5rem",
                            }}
                          />
                        </Button>
                      </Tooltip>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
              </Card>
            </Grid>
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
                  height: { xs: "200px", sm: "650px" },
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
