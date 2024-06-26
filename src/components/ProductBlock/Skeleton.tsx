import React from "react";
import ContentLoader from "react-content-loader";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "../FullProductBlock/FullProductBlock.module.scss";

const Skeleton: React.FC = (props) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <ContentLoader
      // className={styles.root}
      speed={3}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor={theme === "dark" ? "#767676" : "#f9f9f9"}
      foregroundColor={theme === "dark" ? "#a0a0a0" : "#fefefe"}
      {...props}
    >
      <circle cx="140" cy="140" r="140" />
      <rect x="0" y="361" rx="5" ry="5" width="280" height="61" />
      <rect x="0" y="428" rx="3" ry="3" width="125" height="32" />
      <rect x="180" y="430" rx="11" ry="11" width="100" height="30" />
      <rect x="0" y="297" rx="8" ry="8" width="280" height="44" />
    </ContentLoader>
  );
};

export default Skeleton;
