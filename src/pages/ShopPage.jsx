import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import handleErrorFromAxios from "../utils/handleError";
import "./shopPage.css";
import ProductsComponent from "../components/ProductsComponent";
const ProductsPage = () => {
  const navigate = useNavigate();
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [productsArr, setProductsArr] = useState([]);
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
        //*adding extra cell for adding new card
        data.push({ ignore: null });
        setProductsArr(data);
        setOriginalCardsArr(data);
      } catch (err) {
        handleErrorFromAxios(err, undefined, false);
        navigate(ROUTES.HOME);
      }
    })();
  }, []);

  if (!productsArr) {
    return <CircularProgress />;
  }
  return (
    <ProductsComponent
      productsArrProp={productsArr}
      payloadProp={payload}
      setOriginalCardsArrFunc={setOriginalCardsArr}
      setProductsArrFunc={setProductsArr}
      originalCardsArrProp={originalCardsArr}
    />
  );
};

export default ProductsPage;
