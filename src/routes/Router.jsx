import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";
import ProfilePage from "../pages/ProfilePage";
import LogOut from "../components/LogOut";
import CRMPage from "../pages/CRMPage";
import ProductsPage from "../pages/ShopPage";
import SpecificProductPage from "../pages/specificProduct/SpecificProductPage";
import ProtectedRoute from "../components/protectedRoutes/ProtectedRoute";
import ProtectedRouteForAdmin from "../components/protectedRoutes/ProtectedRouteForAdmin";
import useTitle from "../hooks/useTitle";

const Router = () => {
  useTitle()();
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<h1>HOME PAGE</h1>} />
      <Route
        path={ROUTES.REGISTER}
        element={
          <ProtectedRoute
            element={<RegisterPage />}
            supposedToBeLoggedInThis={false}
          />
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <ProtectedRoute
            element={<LoginPage />}
            supposedToBeLoggedInThis={false}
          />
        }
      />
      <Route
        path={ROUTES.LOGOUT}
        element={<ProtectedRoute element={<LogOut />} isLogOut={true} />}
      />
      <Route
        path={ROUTES.PROFILE}
        element={<ProtectedRoute element={<ProfilePage />} />}
      />

      <Route
        path={ROUTES.CRM}
        element={<ProtectedRouteForAdmin element={<CRMPage />} />}
      />
      <Route
        path={ROUTES.CREATE}
        element={
          <ProtectedRouteForAdmin element={<h1>edit in Router.jsx</h1>} />
        }
      />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route
        path={`${ROUTES.SPECIFICPRODUCT}/:id`}
        element={<SpecificProductPage />}
      />
      <Route path={ROUTES.SHOP} element={<ProductsPage />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
