import { Link, useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem";
import { useSelector } from "react-redux";
import { clearAllProductsFromCart } from "../../redux/slices/cartSlice";
import CartEmpty from "../../components/CartEmpty";
import axios from "../../axios.js";
import { RootState, useAppDispatch } from "../../redux/store";
import styles from "./Cart.module.scss";

const Cart: React.FC = () => {
  const { totalPrice, items } = useSelector(
    (state: RootState) => state.cart.cart
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const totalQuant = items.reduce(
    (sum: number, item) => sum + item.quantity,
    0
  );
  const onSubmit = async () => {
    try {
      const fields = { products: items };
      console.log(fields);
      await axios.post("/posts", fields);
      alert("Заказ офромлен");
      navigate("/myorders");
    } catch (error) {
      console.warn(error);
      alert("Пожалуйста зарегистрируйтесь");
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className="cart">
          {totalQuant > 0 ? (
            <>
              <div className={styles.top}>
                <h2 className={styles.title}>Cart</h2>

                <div className={styles.clear}>
                  <span onClick={() => dispatch(clearAllProductsFromCart())}>
                    Clear Cart
                  </span>
                </div>
              </div>
              <div className="cart__items">
                {items.map((item) => (
                  <CartItem key={item._id + item.size + item.type} {...item} />
                ))}
              </div>
              <div className={styles.bottom}>
                <div className={styles.bottom_details}>
                  <span>
                    Products: <b>{totalQuant} pcs.</b>
                  </span>
                  <span>
                    Total: <b>{totalPrice} ₹</b>
                  </span>
                </div>
                <div className={styles.bottom_buttons}>
                  <Link to="/" className={styles.addbutton}>
                    <span>Go Back</span>
                  </Link>
                  <div onClick={onSubmit} className="button pay-btn">
                    <span>Apply now</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <CartEmpty />
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
