import React from "react";
import { Link } from "react-router-dom";
import styles from "./OrderItem.module.scss";

type OrderItemProps = {
  _id: string;
  title: string;
  imageUrl: string;
  type: string;
  size: string;
  quantity: number;
  price: number;
};

const OrderItem: React.FC<OrderItemProps> = ({
  _id,
  title,
  imageUrl,
  type,
  size,
  quantity,
  price,
}) => {
  return (
    <>
      <div className={styles.item}>
        <div className={styles.item_img}>
          <Link to={`/product/${_id}`}>
            <img
              src={`${import.meta.env.VITE_APP_LIMI}${imageUrl}`}
              alt="Pizza"
            />
          </Link>
        </div>
        <div className={styles.item_info}>
          <Link to={`/product/${_id}`}>
            <h3>{title}</h3>
          </Link>
          <p>
            {type}, {size} {quantity} Pcs
          </p>
          <p>Total: {quantity * price} ₹</p>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
