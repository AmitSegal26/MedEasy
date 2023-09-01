import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import handleErrorFromAxios from "../utils/handleError";
const useLoggedIn = () => {
  const dispatch = useDispatch();
  return async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      let { data } = await axios.get(
        "http://localhost:8181/api/users/userInfo"
      );
      if (!data) {
        localStorage.clear();
        throw "invalid token";
      }
      delete data.__v;
      delete data.createdAt;
      delete data.password;
      const payload = jwt_decode(token);
      let fullObjOfRedux = { payload, data };
      dispatch(authActions.login(fullObjOfRedux));
    } catch (err) {
      //server error
      //invalid token
      handleErrorFromAxios(err, "problem logging in, try again later", false);
    }
  };
};

export default useLoggedIn;
