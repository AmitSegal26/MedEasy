// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { authActions } from "../store/auth";
// import { toast } from "react-toastify";
// const useLoggedIn = () => {
//   const dispatch = useDispatch();
//   return async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         return;
//       }
//       let { data } = await axios.get(
//         "http://localhost:8181/api/users/userInfo"
//       );
//       if (!data) {
//         localStorage.clear();
//         throw "invalid token";
//       }
//       delete data.__v;
//       delete data.createdAt;
//       delete data.password;
//       dispatch(authActions.login(data));
//     } catch (err) {
//       if (!err.response) {
//         toast.error("something went wrong, try again later");
//         return;
//       }
//       toast.error(
//         err.response.data && err.response.data.msg
//           ? err.response.data.msg
//           : "problem logging in at the moment, try again later"
//       );
//       //server error
//       //invalid token
//     }
//   };
// };

// export default useLoggedIn;
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
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
      console.log(fullObjOfRedux);
      dispatch(authActions.login(fullObjOfRedux));
    } catch (err) {
      //server error
      //invalid token
      if (err && err.response && err.response.data && err.response.data.msg) {
        toast.error(err.response.data.msg);
      } else {
        toast.error("something went wrong, try again later please!");
      }
    }
  };
};

export default useLoggedIn;
