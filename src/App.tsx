import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { Products } from "./views/Products/Products";
import { Cart } from "./views/Cart/Cart";
import { NavBar } from "./components/NavBar/NavBar";
import { Contact } from "./views/Contact/Contact";
import { ProductsContextProvider } from "./context/ProductsProvider";
import { ProductDetails } from "./views/ProductDetails/ProductDetails";
import { CartContextProvider } from "./context/CartProvider";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <>
      <ProductsContextProvider>
        <CartContextProvider>
          <NavBar />
          <Routes>
            <Route path="/Shop/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
          </Routes>
        </CartContextProvider>
      </ProductsContextProvider>
      <Footer />
    </>
  );
}

export default App;
