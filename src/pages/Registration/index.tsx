import React from "react";
import styles from "../Login/Login.module.scss";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchUserRegister, selectIsAuth } from "../../redux/slices/authSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/store";
import { ThemeContext } from "../../context/ThemeContext";

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

export const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<FormData> = async (values) => {
    const data = await dispatch(fetchUserRegister(values));
    if (!data.payload) {
      alert("User is already being");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      console.log("DATAREG", data);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }
  const { theme } = React.useContext(ThemeContext);

  return (
    <div className={`${styles.root} ${styles[theme]}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <div className={styles.inputbox}>
          <input
            type="text"
            placeholder="Input name"
            className={styles.input}
            {...register("fullName", { required: "Input fullName" })}
          />
          <svg
            className={styles.icon}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-width="2"
              d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
        <div className={styles.inputbox}>
          <input
            type="email"
            placeholder="Input Email"
            {...register("email", { required: "Input email" })}
            className={styles.input}
          />
          <svg
            className={styles.icon}
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
              d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
            />
          </svg>
        </div>
        <div className={styles.inputbox}>
          <input
            type="password"
            placeholder="Input password"
            {...register("password", { required: "Input password" })}
            className={styles.input}
          />
          <svg
            className={styles.icon}
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
              d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
            />
          </svg>
        </div>
        <button className={styles.button} disabled={!isValid} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
