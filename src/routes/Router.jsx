import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
//* pages
import RegisterPage from "../pages/register/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";
import ProfilePage from "../pages/ProfilePage";
import LogOut from "../components/LogOut";
import CRMPage from "../pages/CRMPage";
import ProductsPage from "../pages/ShopPage";
import SpecificProductPage from "../pages/specificProduct/SpecificProductPage";
import GalleryPage from "../pages/gallery/GalleryPage";
import ContactPage from "../pages/contact/ContactPage";
import CreateCardPage from "../pages/CreateCardPage";
import EditCardPage from "../pages/EditCardPage";
import CartPage from "../pages/CartPage";
import HomePage from "../pages/homePage/HomePage";
import Page404 from "../pages/page404/Page404";
import SpecificUserPage from "../pages/SpecificUserPage";
//* protection
import ProtectedRoute from "../components/protectedRoutes/ProtectedRoute";
import ProtectedRouteForAdmin from "../components/protectedRoutes/ProtectedRouteForAdmin";
//* title custom hook
import useTitle from "../hooks/useTitle";
//*customHistory class
import HISTORY from "../utils/hrefAndHistory/handleHistoryChange";

const Router = () => {
  useTitle()();
  window.scrollTo({ top: 0 });
  HISTORY.setNewPage(window.location.href);
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
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
        element={<ProtectedRoute element={<CartPage />} isLogOut={false} />}
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
      <Route
        path={`${ROUTES.SPECIFICUSER}/:id`}
        element={<ProtectedRouteForAdmin element={<SpecificUserPage />} />}
      />
      <Route path={ROUTES.SHOP} element={<ProductsPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Router;
