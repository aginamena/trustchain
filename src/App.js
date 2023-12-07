import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import Header from "components/Header";
import SnackbarCmp from "components/SnackbarCmp";
import { AppContext } from "context/appContext";
import MyAccount from "pages/MyAccount";
import ProductDetails from "pages/ProductDetails";
import ProductsForReview from "pages/ProductsForReview";
import { useState } from "react";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import Root from "./pages/Root";
import { darkTheme } from "./theme";
import PublishedProducts from "pages/PublishedProducts";
import TermsOfUse from "pages/TermsOfUse";
import AboutUs from "pages/AboutUs";
import DialogCmp from "components/DialogCmp";
import DrawerCmp from "components/DrawerCmp";
import ProtectedRoute from "components/ProtectedRoute";
import { isUserAdmin } from "pages/util";
import { getUser } from "pages/util";
import SellYourProducts from "pages/SellYourProducts";
import SellerProducts from "pages/SellerProducts";

function App() {
  const [showSnackbarCmp, setShowSnackbarCmp] = useState({
    shouldShow: false,
    message: "",
  });
  const [showBackdropCmp, setShowBackdropCmp] = useState(false);
  const [showDrawerCmp, setShowDrawerCmp] = useState(false);
  const state = {
    showSnackbarCmp,
    setShowSnackbarCmp,
    showBackdropCmp,
    setShowBackdropCmp,
    showDrawerCmp,
    setShowDrawerCmp,
  };

  return (
    <AppContext.Provider value={state}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <HashRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<Root />} />
            <Route
              exact
              path="my-account"
              element={
                <ProtectedRoute isAuthorized={getUser()}>
                  <MyAccount />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="product-details/:productId"
              element={<ProductDetails />}
            />
            <Route
              exact
              path="products-for-review"
              element={
                <ProtectedRoute isAuthorized={isUserAdmin()}>
                  <ProductsForReview />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="published-products/:selectedCategory"
              element={<PublishedProducts />}
            />
            <Route
              exact
              path="seller-products/:sellerEmail"
              element={<SellerProducts />}
            />
            <Route exact path="terms-of-use" element={<TermsOfUse />} />
            <Route exact path="about-us" element={<AboutUs />} />
            <Route
              exact
              path="sell-your-products"
              element={<SellYourProducts />}
            />
          </Routes>
          <SnackbarCmp />
          <DrawerCmp />
        </HashRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
