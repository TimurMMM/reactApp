import React from "react";
import emptyCart from "../../assets/img/empty-cart.png";
import styles from "./NotFound.module.scss";

const NotFound: React.FC = () => {
  return (
    <>
      <div className={styles.empty}>
        <h2>Ничего не найдено 😕</h2>

        <img src={emptyCart} alt="Empty cart" />
      </div>
    </>
  );
};

export default NotFound;
