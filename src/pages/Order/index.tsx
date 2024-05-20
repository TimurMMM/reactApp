import React, { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import axios from "../../axios.js";
import {
  fetchAdminOrders,
  fetchUserOrders,
  setOrders,
} from "../../redux/slices/listSlice";
import OrderBlock from "../../components/OrderBlock";
import { RootState, useAppDispatch } from "../../redux/store.js";
import SkeletonOrder from "../../components/OrderBlock/SkeletonOrder.js";
import OrderEmpty from "../../components/OrderEmpty";
import user from "../../assets/img/user.png";
import styles from "./Order.module.scss";
import { useNavigate } from "react-router-dom";
import {
  fetchUserMyData,
  logout,
  selectIsAuth,
} from "../../redux/slices/authSlice";
import { useInView } from "react-intersection-observer";
import { ThemeContext } from "../../context/ThemeContext.js";

const Order: React.FC = () => {
  const { items, status, total } = useSelector(
    (state: RootState) => state.list.orders
  );
  const { data } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const isAuth = useSelector(selectIsAuth);

  const delivery = "";
  const [currentPage, setCurrentPage] = React.useState(1);

  const logicFetchBurgers = async () => {
    if (isAuth && data?.role !== "Admin") {
      dispatch(fetchUserOrders());
    } else {
      dispatch(
        fetchAdminOrders({
          delivery,
          currentPage,
        })
      );
    }
  };

  const totalTrue = Boolean(total > items.length);

  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: true,
  });

  React.useEffect(() => {
    dispatch(setOrders());
    setCurrentPage(1);
  }, []);

  React.useEffect(() => {
    if (inView && totalTrue) {
      logicFetchBurgers();
      setCurrentPage((prevState) => prevState + 1);
    }
  }, [inView, totalTrue]);

  const skeletonData = [...new Array(16)].map((_, index) => (
    <SkeletonOrder key={index} />
  ));

  const navigate = useNavigate();

  const [avatarUrl, setAvatarUrl] = React.useState("");
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await axios.post<{ url: string }>(
          "/uploaduserimage",
          formData
        );
        setAvatarUrl(data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    const fields = { avatarUrl };
    try {
      await axios.patch(`/changeuser/`, fields);
      console.log("Аватар изменен");
      alert("Вы изменили аватар");
      dispatch(fetchUserMyData());
      setAvatarUrl("");
    } catch (error) {
      console.warn(error);
    }
  };

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/");
  };

  const orderData = items.map((item, index) => (
    <OrderBlock key={item._id} {...item} />
  ));

  const { theme } = React.useContext(ThemeContext);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.info_title}>
          <h1>Orders</h1>
        </div>

        <div className={styles.userinfo}>
          <div
            className={styles.image}
            onClick={() => inputFileRef.current?.click()}
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
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
              />
            </svg>

            {avatarUrl ? (
              <img
                src={`${import.meta.env.VITE_APP_LIMI}${avatarUrl}`}
                alt="Pizza"
              />
            ) : data?.avatarUrl ? (
              <img
                src={`${import.meta.env.VITE_APP_LIMI}${data.avatarUrl}`}
                alt="Pizza"
              />
            ) : (
              <img src={user} alt="UserImg" />
            )}
          </div>
          {avatarUrl && (
            <div onClick={onSubmit} className={styles.remember}>
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
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          )}
          <div>
            <h2>{data?.fullName}</h2>

            <p>{data?.email}</p>
          </div>
          <form className={styles.inputbox}>
            <input
              ref={inputFileRef}
              type="file"
              placeholder="avatarUrl"
              onChange={handleChangeFile}
              hidden
            />

            <div
              className={`${styles.logout} ${styles[theme]}`}
              onClick={onClickLogout}
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
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                />
              </svg>
            </div>
          </form>
        </div>
      </div>
      {status === "success" && <p>Total Orders: {total}</p>}

      <div>
        {status === "success" && total === 0 ? <OrderEmpty /> : orderData}
        <div ref={ref}></div>
        {status !== "success" && skeletonData}
      </div>
    </div>
  );
};

export default Order;
