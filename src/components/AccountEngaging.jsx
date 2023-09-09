import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import COLORS from "../colors/COLORS";

const AccountEngaging = ({ isSignInOrUp }) => {
  return (
    <Grid container justifyContent="flex-end">
      <Grid item>
        <Link
          to={
            isSignInOrUp == "register"
              ? ROUTES.REGISTER
              : isSignInOrUp == "login"
              ? ROUTES.LOGIN
              : ROUTES.HOME
          }
          style={{ color: `${COLORS.TEXT2}` }}
          variant="body2"
        >
          {isSignInOrUp == "register"
            ? "Don't have an account yet? Sign up"
            : isSignInOrUp == "login"
            ? "Already have an account? Sign in"
            : ROUTES.HOME}
        </Link>
      </Grid>
    </Grid>
  );
};

export default AccountEngaging;
