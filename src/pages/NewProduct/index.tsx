import React, { ChangeEvent } from "react";
import axios from "../../axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./NewProduct.module.scss";
import { ThemeContext } from "../../context/ThemeContext";
import Categories from "../../components/Categories";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { setActiveCat } from "../../redux/slices/filterSlice";
import addproduct from "../../assets/img/addproduct.png";

const NewProduct: React.FC = () => {
  const { _id } = useParams();
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");

  const [imageUrl, setImageUrl] = React.useState("");
  const [typeListIdSt, setTypeListIdSt] = React.useState<string | string[]>("");

  const [sizeListSt, setSizeListSt] = React.useState<string | string[]>("");
  console.log(title);
  React.useEffect(() => {
    if (_id) {
      axios.get(`/products/${_id}`).then(({ data }) => {
        setTitle(data.title);
        setPrice(data.price);
        setImageUrl(data.imageUrl);
        setTypeListIdSt(data.typeListId);
        setSizeListSt(data.sizeList);
        dispatch(setActiveCat(data.category));
      });
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const isEditing = Boolean(_id);
  const typeListId = (
    typeof typeListIdSt === "string" ? typeListIdSt : typeListIdSt.toString()
  ).split(",");
  const sizeList = (
    typeof sizeListSt === "string" ? sizeListSt : sizeListSt.toString()
  ).split(",");
  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        price,
        typeListId,
        sizeList,
        imageUrl,
        category: activeCat,
      };
      const { data } = isEditing
        ? await axios.patch(`/products/${_id}`, fields)
        : await axios.post("/products", fields);
      const id = isEditing ? _id : data._id;
      navigate(`/`);
    } catch (error) {
      console.warn(error);
    }
  };

  const onClickDeleteProd = async () => {
    if (window.confirm("Вы действительно хотите удалить продукт?")) {
      try {
        await axios.delete(`/products/${_id}`);
        navigate("/");
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const onSubmitCopy = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        price,
        typeListId,
        sizeList,
        imageUrl,
        category: activeCat,
      };
      const { data } = await axios.post("/products", fields);
      const id = isEditing ? _id : data._id;
      navigate(`/product/${id}`);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await axios.post<{ url: string }>("/upload", formData);
        setImageUrl(data.url);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { theme } = React.useContext(ThemeContext);

  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const onClickCategory = React.useCallback((i: number) => {
    dispatch(setActiveCat(i));
  }, []);

  const { activeCat } = useSelector((state: RootState) => state.filter);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h2 className={styles.titleMain}>Create New Product</h2>
        <div className={`${styles.root} ${styles[theme]}`}>
          <div className={styles.left}>
            {imageUrl ? (
              <div className={styles.image}>
                <img
                  onClick={() => inputFileRef.current?.click()}
                  src={`${import.meta.env.VITE_APP_LIMI}${imageUrl}`}
                  alt="Pizza"
                />
                <div className={styles.views} onClick={onClickDeleteProd}>
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
                      d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <div className={styles.image}>
                <img
                  onClick={() => inputFileRef.current?.click()}
                  src={addproduct}
                  alt="Pizza"
                />
              </div>
            )}
            <input
              ref={inputFileRef}
              type="file"
              placeholder="ImageUrl"
              onChange={handleChangeFile}
              hidden
            />
          </div>
          <div className={styles.right}>
            <h4 className={styles.title}>
              <input
                className={styles.input}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                required
              />
            </h4>

            <div className={styles.price}>
              <input
                className={styles.input}
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrice(e.target.value)
                }
                required
              />
            </div>

            <div className={styles.categories}>
              <Categories
                activeCat={activeCat}
                setActiveCat={onClickCategory}
              />
            </div>

            <div className={styles.selector}>
              <ul>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Type"
                  value={typeListId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTypeListIdSt(e.target.value)
                  }
                  required
                />
              </ul>
              <ul>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Size"
                  value={sizeList}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSizeListSt(e.target.value)
                  }
                  required
                />
              </ul>
            </div>
            <div className={styles.buttons}>
              <button onClick={onSubmit} className={styles.addbutton}>
                <span>Ok</span>
              </button>
              <button onClick={onSubmitCopy} className={styles.addbutton}>
                <span>Copy</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
