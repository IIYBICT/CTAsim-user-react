import React from "react";
import styles from "./index.module.less";
const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className="bg" />
      <div className="loadContainer">
        <div className="loader" />
      </div>
    </div>
  );
};

export default Loading;
