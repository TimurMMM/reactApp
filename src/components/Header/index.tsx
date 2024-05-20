import { Link, useLocation } from "react-router-dom";
import logoImg from "../../../public/vite.svg";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { RootState } from "../../redux/store";
import { isMobile } from "react-device-detect";
import styles from "./Header.module.scss";
import { ThemeContext } from "../../context/ThemeContext";
import Search from "../Search";
import { setOpenSearch, setSearchData } from "../../redux/slices/filterSlice";
import user from "../../assets/img/user.png";

function Header() {
  const { totalPrice, items } = useSelector(
    (state: RootState) => state.cart.cart
  );
  const { data } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [items]);

  const totalQuant = items.reduce(
    (sum: number, item) => sum + item.quantity,
    0
  );
  const location = useLocation();

  const { theme, setTheme } = React.useContext(ThemeContext);

  const { openSearch } = useSelector((state: RootState) => state.filter);

  const onClickTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    document.documentElement.setAttribute(
      "data-color-scheme",
      theme === "light" ? "dark" : "light"
    );
  };

  const onClickSearch = () => {
    dispatch(setOpenSearch(!openSearch));
    if (!openSearch) {
      dispatch(setSearchData(""));
    }
  };

  return (
    <header className={`${styles.root} ${styles[theme]}`}>
      <div className={styles.container}>
        <Link to="/">
          <div className={styles.logo}>
            <img width="20" src={logoImg} alt="UserImg" />
            <div>
              <h1>Town & Village</h1>
              <p>Choose Your Style</p>
            </div>
          </div>
        </Link>

        {location.pathname == "/" && (
          <>
            {isMobile ? (
              <div
                className={`${styles.icon} ${styles[theme]}`}
                onClick={() => onClickSearch()}
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            ) : (
              <Search />
            )}
          </>
        )}
        <div className={styles.icontheme} onClick={() => onClickTheme()}>
          {theme === "dark" ? (
            <svg
              className={styles.icon_moon}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
              />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"
              />
            </svg>
          )}
        </div>
        <nav className={styles.rightside}>
          <div className={`${styles.userorders} ${styles[theme]}`}>
            <>
              <Link
                to={
                  window.localStorage.getItem("token") ? "/myorders" : "/login"
                }
              >
                {data?.avatarUrl ? (
                  <img
                    width="20"
                    src={`${import.meta.env.VITE_APP_LIMI}${data?.avatarUrl}`}
                    alt="UserImg"
                  />
                ) : (
                  <img src={user} alt="UserImg" />
                )}
              </Link>
              <div>
                {window.localStorage.getItem("token") ? (
                  <Link to="/myorders">
                    <p>My Orders</p>
                  </Link>
                ) : (
                  <Link to="/login">
                    <p>Login</p>
                  </Link>
                )}
              </div>
            </>
          </div>
          <div>
            <Link to="/cart" className={styles.button}>
              {!isMobile && (
                <>
                  <span>{totalPrice} ₹</span>
                  <div className={styles.button_delimiter}></div>
                </>
              )}
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{totalQuant}</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
