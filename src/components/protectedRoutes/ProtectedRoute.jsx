import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element, supposedToBeLoggedInThis, isLogOut }) => {
  //* logic section
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const handleReject = () => {
    return <Navigate to={ROUTES.HOME} />;
  };
  if (supposedToBeLoggedInThis) {
    //protectd for loggen in users
    if (isLoggedIn) {
      return element;
    } else {
      if (!isLogOut) {
        //is not the log out component
        toast.error("only for logged users. log in first!");
      }
      return handleReject();
    }
  } else {
    //protected for new users or not logged in users
    if (!isLoggedIn) {
      return element;
    } else {
      toast.error("already logged in and registered. log out first!");
      return handleReject();
    }
  }
};
ProtectedRoute.defaultProps = {
  supposedToBeLoggedInThis: true,
  isLogOut: false,
};

export default ProtectedRoute;
