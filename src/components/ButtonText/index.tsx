import type { FC, ReactNode } from "react";

import Link from "next/link";
import style from "./index.module.css";

interface IProps {
  align: "left" | "center" | "right";
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}

export const ButtonText: FC<IProps> = ({ align, children, href, onClick }) => {
  const styles = {
    textAlign: align,
  };

  return (
    <>
      {href ? (
        <Link className={style.Item} href={href} style={styles}>
          {children}
        </Link>
      ) : (
        <button className={style.Item} onClick={onClick} style={styles} type="button">
          {children}
        </button>
      )}
    </>
  );
};
