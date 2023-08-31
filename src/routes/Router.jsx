import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
//* pages
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";
import ProfilePage from "../pages/ProfilePage";
import LogOut from "../components/LogOut";
import CRMPage from "../pages/CRMPage";
import ProductsPage from "../pages/ShopPage";
import SpecificProductPage from "../pages/specificProduct/SpecificProductPage";
import GalleryPage from "../pages/GalleryPage/GalleryPage";
//* protection
import ProtectedRoute from "../components/protectedRoutes/ProtectedRoute";
import ProtectedRouteForAdmin from "../components/protectedRoutes/ProtectedRouteForAdmin";
//* title hook
import useTitle from "../hooks/useTitle";
import ContactPage from "../pages/Contact/ContactPage";
import CreateCardPage from "../pages/CreateCardPage";
import EditCardPage from "../pages/EditCardPage";
import CartPage from "../pages/CartPage";

const Router = () => {
  useTitle()();
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<h1>Edit in Router.js HOMEPAGE</h1>} />
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
        path={ROUTES.CART}
        element={<ProtectedRoute element={<CartPage />} isLogOut={true} />}
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
        path={ROUTES.EDIT + "/:id"}
        element={<ProtectedRouteForAdmin element={<EditCardPage />} />}
      />
      <Route
        path={ROUTES.CREATE}
        element={<ProtectedRouteForAdmin element={<CreateCardPage />} />}
      />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.CONTACTUS} element={<ContactPage />} />
      <Route path={ROUTES.GALLERY} element={<GalleryPage />} />
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
