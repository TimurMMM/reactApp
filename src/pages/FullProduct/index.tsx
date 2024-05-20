import React from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import FullProductBlock from "../../components/FullProductBlock";
import { IProdItem } from "../../redux/slices/listSlice";
import Skeleton from "../../components/ProductBlock/Skeleton";
import styles from "./FullProduct.module.scss";
import { ThemeContext } from "../../context/ThemeContext";

const FullProduct: React.FC = () => {
  const [data, setData] = React.useState<IProdItem>();
  const { _id } = useParams();
  React.useEffect(() => {
    async function fetchBurger() {
      try {
        const { data } = await axios.get<IProdItem>(`/products/${_id}`);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.warn(error);
        alert("Error product");
      }
    }
    fetchBurger();
  }, []);

  const [isLoading, setIsLoading] = React.useState(true);

  const { theme } = React.useContext(ThemeContext);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        {!data || isLoading ? (
          <Skeleton />
        ) : (
          <FullProductBlock
            title={data.title}
            price={data.price}
            imageUrl={data.imageUrl}
            _id={data._id}
            sizeList={data.sizeList}
            typeListId={data.typeListId}
            viewsCount={data.viewsCount}
            rating={data.rating}
          />
        )}
      </div>
      <Link to="/">
        <button className={`${styles.addbutton} ${styles[theme]}`}>
          <span>Go Back</span>
        </button>
      </Link>
    </div>
  );
};

export default FullProduct;
