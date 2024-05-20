import React from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import {
  setActiveCat,
  setCurrentPage,
  setSearchData,
} from "../../redux/slices/filterSlice";
import { ThemeContext } from "../../context/ThemeContext";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onClickClear = () => {
    setValue("");
    dispatch(setSearchData(""));
    inputRef.current?.focus();
  };
  const updateInput = React.useCallback(
    debounce((str: string) => {
      dispatch(setCurrentPage(1));
      dispatch(setActiveCat(0));
      dispatch(setSearchData(str));
    }, 1000),
    []
  );
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateInput(event.target.value);
  };

  const { theme } = React.useContext(ThemeContext);

  return (
    <>
      <div className={styles.root}>
        <svg
          className={`${styles.icon} ${styles[theme]}`}
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
            strokeWidth="2"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>
        <input
          ref={inputRef}
          value={value}
          onChange={onChangeInput}
          className={`${styles.input} ${styles[theme]}`}
          placeholder="Burger's Search..."
        />
        {value && (
          <svg
            onClick={onClickClear}
            className={styles.clearIcon}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        )}
      </div>
    </>
  );
};

export default Search;
