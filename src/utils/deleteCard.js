import axios from "axios";
import handleErrorFromAxios from "./handleError";
import { toast } from "react-toastify";

const deleteCardFunc = async (
  eventObj,
  originalCardsArrState,
  setOriginalCardsArrStateFunc
) => {
  try {
    if (!eventObj) {
      return;
    }
    if (!eventObj.target) {
      return;
    }
    if (eventObj && eventObj.target && !eventObj.target.id) {
      return;
    }
    let { id } = eventObj.target;
    let {
      data: { _id },
      data: { title },
    } = await axios.delete(`http://localhost:8181/api/cards/delete/${id}`);
    let newProductsArr = JSON.parse(JSON.stringify(originalCardsArrState));
    newProductsArr = newProductsArr.filter((item) => item._id != _id);
    setOriginalCardsArrStateFunc(newProductsArr);
    toast.info(`${title ? title : "item"} has been deleted`);
  } catch (err) {
    handleErrorFromAxios(err, undefined, false);
  }
};

export default deleteCardFunc;
