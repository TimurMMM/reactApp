import "./scss/App.scss";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import React from "react";
import { Registration } from "./pages/Registration";
import NewLogin from "./pages/Login/newLogin";
import FullProduct from "./pages/FullProduct";
import { fetchUserMyData } from "./redux/slices/authSlice";

import Order from "./pages/Order";
import NewProduct from "./pages/NewProduct";
import { useAppDispatch } from "./redux/store";
import Footer from "./components/Footer";
import { useTheme } from "./context/ThemeContext";

function App() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchUserMyData());
  }, []);

  const { theme } = useTheme();

  return (
    <>
      <div className={`${"wrapper"} ${theme}`}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:_id" element={<FullProduct />} />
              <Route path="/product/:_id/edit" element={<NewProduct />} />
              <Route path="/product/create" element={<NewProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<NewLogin />} />
              <Route path="/myorders" element={<Order />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
