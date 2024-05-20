import React from "react";
import { useSelector } from "react-redux";
import Categories from "../../components/Categories";
import Sort from "../../components/Sort";
import ProductBlock from "../../components/ProductBlock";
import Skeleton from "../../components/ProductBlock/Skeleton";
import { setActiveCat, setCurrentPage } from "../../redux/slices/filterSlice";
import { fetchProducts } from "../../redux/slices/listSlice";
import PageEmpty from "../../components/PageEmpty";
import { Pagination } from "../../components/Pagination";
import Search from "../../components/Search";
import { RootState, useAppDispatch } from "../../redux/store";

import styles from "./Home.module.scss";
import { ThemeContext } from "../../context/ThemeContext";
import NotFound from "../NotFound";
import { isMobile } from "react-device-detect";
import { selectIsAuth } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeCat, sortChoose, currentPage, searchData } = useSelector(
    (state: RootState) => state.filter
  );
  const { items, total, status } = useSelector(
    (state: RootState) => state.list.products
  );

  const [orderProp, setOrderProp] = React.useState(false);
  const sortProp = sortChoose.prop;

  const burgersData = items.map((obj) => (
    <ProductBlock key={obj._id} {...obj} />
  ));

  const skeletonData = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const logicFetchProducts = async () => {
    const categoryProp = activeCat > 0 ? `&category=${activeCat}` : "";
    const searchProp = searchData ? `&search=${searchData}` : "";
    dispatch(
      fetchProducts({
        categoryProp,
        searchProp,
        orderProp,
        sortProp,
        currentPage,
      })
    );
  };

  React.useEffect(() => {
    logicFetchProducts();
  }, [sortProp, activeCat, orderProp, searchData, currentPage]);

  const onClickCategory = React.useCallback((i: number) => {
    dispatch(setActiveCat(i));
  }, []);

  const onClickRefresh = () => {
    logicFetchProducts();
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo(0, 0);
  };

  const roundPage = total / 12;

  const pageTotal = Math.ceil(roundPage);

  const isAuth = useSelector(selectIsAuth);
  const { data } = useSelector((state: RootState) => state.auth);
  const { openSearch } = useSelector((state: RootState) => state.filter);

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        {openSearch ? (
          <Search />
        ) : (
          <Categories activeCat={activeCat} setActiveCat={onClickCategory} />
        )}

        <Sort orderProp={orderProp} setOrderProp={setOrderProp} />
      </div>
      <h2 className={styles.title}>All Products</h2>
      <div className={styles.items}>
        {status == "error" ? (
          <PageEmpty onClickRefresh={onClickRefresh} />
        ) : (
          <>
            {status == "loading" ? (
              skeletonData
            ) : (
              <>{total === 0 ? <NotFound /> : burgersData}</>
            )}
          </>
        )}
      </div>
      <div className={styles.pagination}>
        {pageTotal > 1 && (
          <Pagination
            pageTotal={pageTotal}
            currentPage={currentPage}
            onChangePage={onChangePage}
          />
        )}
      </div>
      <div className={styles.addbutton}>
        {isAuth && data?.role === "Admin" && (
          <Link to="/product/create" className={styles.button_circle}>
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
                d="M5 12h14m-7 7V5"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
