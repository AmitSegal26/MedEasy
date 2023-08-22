import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";

const ProtectedRouteForAdmin = ({ element }) => {
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  if (!payload) {
    toast.error("access denied");
    return <Navigate to={ROUTES.HOME} />;
  }
  if (payload && payload.isAdmin) {
    toast.success("");
    return element;
  } else {
    toast.error("admin");
    return <Navigate to={ROUTES.HOME} />;
  }
};

export default ProtectedRouteForAdmin;
