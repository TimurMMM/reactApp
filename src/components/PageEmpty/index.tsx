import React from "react";
import emptyCart from "../../assets/img/empty-cart.png";

type PageEmptyProps = {
  onClickRefresh: () => void;
};

const PageEmpty: React.FC<PageEmptyProps> = ({ onClickRefresh }) => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Nothing Here 😕</h2>
        <p>Try Reload Again.</p>
        <img src={emptyCart} alt="Empty cart" />
        <a onClick={onClickRefresh} className="button button--black">
          <span>Go Back</span>
        </a>
      </div>
    </>
  );
};

export default PageEmpty;
