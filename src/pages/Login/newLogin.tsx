import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth, fetchUserData } from "../../redux/slices/authSlice";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { ThemeContext } from "../../context/ThemeContext";

interface FormData {
  email: string;
  password: string;
}

const newLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<FormData> = async (values) => {
    const data = await dispatch(fetchUserData(values));
    if (!data.payload) {
      alert("Fail Auth");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }

  const { theme } = React.useContext(ThemeContext);
  return (
    <div className={`${styles.root} ${styles[theme]}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div className={styles.inputbox}>
          <input
            className={styles.input}
            type="email"
            placeholder="E-mail"
            {...register("email", { required: "Input email" })}
            required
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
            className={styles.input}
            type="password"
            placeholder="Password"
            {...register("password", { required: "Input password" })}
            required
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
        <div className={styles.remember}>
          <label>
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button className={styles.button} disabled={!isValid} type="submit">
          Login
        </button>
        <div className={styles.registerlink}>
          <p>Don't have an account?</p>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default newLogin;
