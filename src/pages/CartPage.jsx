import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import handleErrorFromAxios from "../utils/handleError";
import ProductsComponent from "../components/productsComponent/ProductsComponent";
const CartPage = () => {
  const [likedCardsArrState, setLikedCardsArrState] = useState(null);
  const [originalLikedCardsArrState, setOriginalLikedCardsArrState] =
    useState(null);
  const { payload } = useSelector((bigPie) => bigPie.authSlice);
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(
          "http://localhost:8181/api/cards/getCart"
        );
        setOriginalLikedCardsArrState(data);
        setLikedCardsArrState(data);
      } catch (err) {
        handleErrorFromAxios(err, undefined, false);
      }
    })();
    localStorage.setItem("prev-page-for-back-arrow-btn", "cart");
  }, []);

  if (!likedCardsArrState) {
    return <CircularProgress />;
  }
  return (
    <ProductsComponent
      titleOfPage="Your Cart"
      subTitleOfPage="Here you can find the items you've added to your cart,you can remove them from your cart by pressing again on the cart icon"
      productsArrProp={likedCardsArrState}
      payloadProp={payload}
      setOriginalCardsArrFunc={setOriginalLikedCardsArrState}
      originalCardsArrProp={originalLikedCardsArrState}
      setProductsArrFunc={setLikedCardsArrState}
    />
  );
};

export default CartPage;
