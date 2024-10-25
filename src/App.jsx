import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";                                       
import { ThemeContext } from "./components/Theme";
import { CartProvider } from "./components/CartContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Details from "./pages/Details";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Checkout from "./pages/Checkout";
import MainLayout from "./layouts/MainLayout";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      if (
        !(
          location.pathname === "/" ||
          location.pathname.includes("register") ||
          location.pathname.includes("about") ||
          location.pathname.includes("products") ||
          location.pathname.includes("cart")
        )
      ) {
        navigate("/login");
      }
    }
  }, [location]);

  function PrivateRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate("/login");
      return null;
    }
    return children;
  }

  return (
    <div
      className={`container mx-auto ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <CartProvider>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route
            path="/products"
            element={
              <MainLayout>
                <Products />
              </MainLayout>
            }
          />
          <Route
            path="/orders"
            element={
              <MainLayout>
                <PrivateRoute isAuth={!!token}>
                  <Orders />
                </PrivateRoute>
              </MainLayout>
            }
          />
          <Route
            path="/cart"
            element={
              <MainLayout>
                <Cart />
              </MainLayout>
            }
          />
          <Route
            path="/products/:id"
            element={
              <MainLayout>
                <Details />
              </MainLayout>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute isAuth={!!token}>
                <MainLayout>
                  <Checkout />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
