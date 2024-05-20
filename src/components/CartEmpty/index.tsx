import React from "react";
import emptyCart from "../../assets/img/empty-cart.png";
import { Link } from "react-router-dom";
import styles from "./CartEmpty.module.scss";

const CartEmpty: React.FC = () => {
  return (
    <>
      <div className={styles.empty}>
        <h2>Cart is Empty 😕</h2>
        <p>Go Home You Order some Product</p>
        <img src={emptyCart} alt="Empty cart" />
        <Link to="/" className={styles.button_black}>
          <span>Go back Home</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
