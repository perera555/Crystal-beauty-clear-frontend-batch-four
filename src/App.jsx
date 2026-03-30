import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

import LoginPage from "./pages/loginPage";
import AdminPage from "./pages/adminPage";

import RegisterPage from "./pages/client/registerPage";
import HomePage from "./pages/client/homePage";
import ForgetPassword from "./pages/client/forgetPassword";

import ProductsPage from "./pages/client/productsPage";
import ProductOverview from "./pages/client/productOverview";
import CartPage from "./pages/client/cart";
import CheckoutPage from "./pages/client/checkout";
import ContactPage from "./pages/client/contactPage";
import AboutPage from "./pages/client/aboutPage";
import ReviewPage from "./pages/client/reviewPage";

import "./App.css";

function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <BrowserRouter>
        <Toaster position="top-right" />

        <Routes>
          {/* ADMIN */}
          <Route path="/admin/*" element={<AdminPage />} />

          {/* AUTH */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forget" element={<ForgetPassword />} />

          {/* CLIENT */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* PRODUCT */}
          <Route path="/overview/:id" element={<ProductOverview />} />

          {/* ✅ FIX STARTS HERE */}
          
          {/* Navbar Reviews (NO ID) */}
          <Route path="/reviews" element={<ReviewPage />} />

          {/* Product Reviews (WITH ID) */}
          <Route path="/reviews/:id" element={<ReviewPage />} />

          {/* ✅ FIX ENDS HERE */}

          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <h1 className="text-center mt-10 text-3xl">
                404 Not Found
              </h1>
            }
          />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;