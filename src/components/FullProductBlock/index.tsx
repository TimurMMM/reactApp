import React, { useState } from "react";
import { addingProductsToCart } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import styles from "./FullProductBlock.module.scss";
import { ThemeContext } from "../../context/ThemeContext";
import { selectIsAuth } from "../../redux/slices/authSlice";

type TFullProductBlockProps = {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizeList: string[];
  typeListId: string[];
  viewsCount: number;
  rating: number;
};

const FullProductBlock: React.FC<TFullProductBlockProps> = ({
  _id,
  title,
  price,
  imageUrl,
  sizeList,
  typeListId,
  viewsCount,
  rating,
}) => {
  const [sizeCount, setSizeCount] = useState(0);
  const [typeCount, setTypeCount] = useState(0);
  const typeList = ["Town", "Village"];
  const onClickSize = (i: number) => {
    setSizeCount(i);
  };
  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.cart.items.find(
      (obj) =>
        obj._id === _id &&
        obj.type === typeList[typeCount] &&
        obj.size === sizeList[sizeCount]
    )
  );
  const addedCount = cartItem ? cartItem.quantity : 0;

  const onClickAddToCart = () => {
    const item = {
      _id,
      title,
      price,
      quantity: 0,
      imageUrl,
      type: typeList[typeCount],
      size: sizeList[sizeCount],
    };
    dispatch(addingProductsToCart(item));
  };

  const { theme } = React.useContext(ThemeContext);

  const { data } = useSelector((state: RootState) => state.auth);

  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`${styles.root} ${styles[theme]}`}>
      <div className={styles.left}>
        <img
          className={styles.image}
          src={`${import.meta.env.VITE_APP_LIMI}${imageUrl}`}
          alt="Pizza"
        />
        <div className={`${styles.views} ${styles[theme]}`}>
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
              strokeWidth="2"
              d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
            />
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <p>{viewsCount}</p>
        </div>
        {isAuth && data?.role === "Admin" && (
          <div className={styles.edit}>
            <Link to={`/product/${_id}/edit`}>
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
                  d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
      <div className={styles.right}>
        <h4 className={styles.title}>{title}</h4>
        <p>Rating {rating} / 5</p>
        <div className={styles.price}>
          <p>From {price} ₹</p>
        </div>
        <div className={`${styles.selector} ${styles[theme]}`}>
          <ul>
            {typeListId.map((_, i) => (
              <li
                key={i}
                onClick={() => setTypeCount(i)}
                className={typeCount == i ? styles.active : ""}
              >
                {typeList[i]}
              </li>
            ))}
          </ul>
          <ul>
            {sizeList.map((size, i) => (
              <li
                key={i}
                onClick={() => onClickSize(i)}
                className={sizeCount == i ? styles.active : ""}
              >
                {size}
              </li>
            ))}
          </ul>
        </div>
        <button
          className={`${styles.addbutton} ${styles[theme]}`}
          onClick={onClickAddToCart}
        >
          <span>Add to Cart</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default FullProductBlock;
