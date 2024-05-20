import React from "react";

import mongoLogo from "../../assets/img/mongodb.svg";
import expressLogo from "../../assets/img/icons8-express-js.svg";
import reactLogo from "../../assets/img/react-icons.svg";
import nodeLogo from "../../assets/img/nodejs-icon.svg";
import styles from "./Footer.module.scss";
import { ThemeContext } from "../../context/ThemeContext";

const Footer: React.FC = () => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <div className={`${styles.root} ${styles[theme]}`}>
      <div className={styles.container}>
        <p>This is MERN Application</p>
        <div className="">
          <img width="24" src={mongoLogo} alt="Mongo logo" />
          <img width="24" src={expressLogo} alt="Express logo" />
          <img width="24" src={reactLogo} alt="React logo" />
          <img width="24" src={nodeLogo} alt="Node logo" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
