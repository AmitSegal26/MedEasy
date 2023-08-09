import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import useLoggedIn from "../hooks/useLoggedIn";
import { toast } from "react-toastify";
const LogOut = () => {
  const dispatch = useDispatch();
  const loggedIn = useLoggedIn();
  const { isLoggedIn } = useSelector((bigRedux) => bigRedux.authSlice);
  useEffect(() => {
    dispatch(authActions.logout());
    localStorage.clear();
    loggedIn();
    toast.info("user logged out");
  }, []);
  if (isLoggedIn) {
    return <Navigate to={ROUTES.HOME} />;
  } else {
    return <CircularProgress />;
  }
};

export default LogOut;
