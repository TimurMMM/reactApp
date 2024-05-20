import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";
import styles from "./Categories.module.scss";
import { ThemeContext } from "../../context/ThemeContext";

type CategoriesProps = {
  activeCat: number;
  setActiveCat: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ activeCat, setActiveCat }) => {
  const catList = [
    "All",
    "Burgers",
    "Limonades",
    "Snacks",
    "Icecream",
    "Roles",
  ];
  const dispatch = useDispatch();
  const onClickCat = (index: number) => {
    setActiveCat(index);
    dispatch(setCurrentPage(1));
  };

  const { theme } = React.useContext(ThemeContext);

  return (
    <div className={`${styles.categories} ${styles[theme]}`}>
      <ul>
        {catList.map((value, index) => (
          <li
            key={index}
            onClick={() => onClickCat(index)}
            className={activeCat == index ? styles.active : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
