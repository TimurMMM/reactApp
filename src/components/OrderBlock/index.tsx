import React from "react";
import userImg from "../../assets/img/user.png";
import axios from "../../axios.js";
import OrderItem from "../OrderItem/index.js";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/authSlice.js";
import { RootState, useAppDispatch } from "../../redux/store";
import { TUser } from "../../redux/slices/listSlice";
import { ICartItem } from "../../redux/slices/cartSlice";
import styles from "./OrderBlock.module.scss";
import { ThemeContext } from "../../context/ThemeContext";
import { isMobile } from "react-device-detect";

export type OrderBlockProps = {
  _id: string;
  status: number;
  user: TUser;
  delivery?: TUser;
  products: ICartItem[];
  createdAt: string;
};

const OrderBlock: React.FC<OrderBlockProps> = ({
  _id,
  status,
  user,
  delivery,
  products,
  createdAt,
}) => {
  const fullPrice = products.reduce(
    (sum: number, obj) => obj.price * obj.quantity + sum,
    0
  );

  const statusList = ["Waiting", "Process", "Delivery", "Success"];
  const dispatch = useAppDispatch();
  const onSubmit = async () => {
    const fields = { status: 1 };
    try {
      await axios.patch(`/posts/${_id}`, fields);
      console.log("Заказ принят");
      alert("Вы приняли заказ");
    } catch (error) {
      console.warn(error);
    }
    window.location.reload();
  };
  const [popup, setPopap] = React.useState(false);
  const [popupOrder, setPopapOrder] = React.useState(false);
  const onClickStatus = async (obj: string, i: number) => {
    const fields = { status: i };
    try {
      await axios.patch(`/posts/${_id}`, fields);
      console.log("Заказ принят");
      alert(`Вы изменили статус на ${obj}`);
    } catch (error) {
      console.warn(error);
    }
    window.location.reload();
  };
  const { data } = useSelector((state: RootState) => state.auth);
  const isAuth = useSelector(selectIsAuth);

  const { theme } = React.useContext(ThemeContext);

  return (
    <>
      <div className={`${styles.item} ${styles[theme]}`}>
        <div className={styles.item_info}>
          <span onClick={() => setPopapOrder(!popupOrder)}>
            # {new Date(createdAt).toDateString()}
          </span>
        </div>

        <div className={styles.item_count}>
          {isAuth && data?.role == "Admin" && (
            <>
              <p>{user.fullName}</p>
              {!isMobile && (
                <div className={styles.item_img}>
                  {user.avatarUrl ? (
                    <img
                      width="20"
                      src={`${import.meta.env.VITE_APP_LIMI}${user.avatarUrl}`}
                      alt="UserImg"
                    />
                  ) : (
                    <img src={userImg} alt="UserImg" />
                  )}
                </div>
              )}
            </>
          )}
        </div>
        {isAuth && data?.role == "Admin" && (
          <>
            <div className={styles.item_status}>
              {delivery ? (
                <>
                  <div>
                    {popup && (
                      <div className={styles.popup}>
                        <ul>
                          {statusList.map((obj, i) => (
                            <li
                              key={i}
                              onClick={() => onClickStatus(obj, i)}
                              className=""
                            >
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div onClick={() => setPopap(!popup)}>
                    <span>{statusList[status]}</span>
                  </div>
                </>
              ) : (
                <div className={styles.button} onClick={onSubmit}>
                  Accept!
                </div>
              )}
            </div>
          </>
        )}

        <div className={styles.item_price}>
          <b>{fullPrice} ₹</b>
        </div>
      </div>
      {popupOrder &&
        products.map((item) => (
          <OrderItem key={item._id + item.size + item.type} {...item} />
        ))}
    </>
  );
};

export default OrderBlock;
