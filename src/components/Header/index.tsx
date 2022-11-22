import type { FC } from "react";
import styles from "./index.module.css";

export const Header: FC = () => {
  return (
    <header className={styles.container}>
      <h1>Meret</h1>
    </header>
  );
};
