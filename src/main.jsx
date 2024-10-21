import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./components/CartContext.jsx";
import { ThemeProvider } from "./components/Theme.jsx";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </CartProvider>
);
