import React from "react";
import {
  addingProductsToCart,
  removeProductsFromCart,
  deleteWholeProduct,
  ICartItem,
} from "../../redux/slices/cartSlice";
import { useAppDispatch } from "../../redux/store";
import styles from "./CartItem.module.scss";

type CartItemProps = {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  type: string;
  size: string;
};

const CartItem: React.FC<CartItemProps> = ({
  _id,
  title,
  price,
  imageUrl,
  quantity,
  type,
  size,
}) => {
  const dispatch = useAppDispatch();
  const onClickPlusButton = () => {
    dispatch(addingProductsToCart({ _id, size, type } as ICartItem));
  };
  const onClickMinusButton = () => {
    dispatch(removeProductsFromCart({ _id, size, type } as ICartItem));
  };
  const onClickDeleteButton = () => {
    dispatch(deleteWholeProduct({ _id, size, type } as ICartItem));
  };
  return (
    <>
      <div className={styles.item}>
        <div className={styles.item_img}>
          <img
            src={`${import.meta.env.VITE_APP_LIMI}${imageUrl}`}
            alt="Pizza"
          />
        </div>
        <div className={styles.infocount}>
          <div className={styles.item_info}>
            <h3>{title}</h3>
            <p>
              {type}, {size}
            </p>
          </div>
          <div className={styles.item_count}>
            <button
              disabled={quantity === 1}
              onClick={onClickMinusButton}
              className={styles.button_plus}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                  fill="#EB5A1E"
                ></path>
              </svg>
            </button>
            <b>{quantity}</b>
            <button onClick={onClickPlusButton} className={styles.button_plus}>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                  fill="#EB5A1E"
                ></path>
                <path
                  d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                  fill="#EB5A1E"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.priceremove}>
          <div className={styles.item_price}>
            <b>{price * quantity} ₹</b>
          </div>
          <div onClick={onClickDeleteButton} className={styles.blockremove}>
            <div className={styles.item_remove}>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                  fill="#EB5A1E"
                ></path>
                <path
                  d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                  fill="#EB5A1E"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
