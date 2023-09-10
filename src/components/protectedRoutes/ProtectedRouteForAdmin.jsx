import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";

const ProtectedRouteForAdmin = ({ element }) => {
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  const handleReject = () => {
    toast.error("access denied");
    return <Navigate to={ROUTES.HOME} />;
  };
  if (!payload) {
    return handleReject();
  }
  if (payload && payload.isAdmin) {
    return element;
  } else {
    return handleReject();
  }
};

export default ProtectedRouteForAdmin;
