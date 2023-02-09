import type { FC, ReactNode } from "react";

import Link from "next/link";
import style from "./index.module.css";

interface IProps {
  children: ReactNode;
  href?: string;
  scroll?: string;
  title?: string;
  view: "list" | "grid";
}

export const List: FC<IProps> = ({ children, href, scroll, title, view }) => {
  return (
    <div className={style.Container} data-scroll={scroll}>
      {title && (
        <div className={style.Title}>
          <h3>{title}</h3>
          {href && <Link href={href}>SHOW ALL</Link>}
        </div>
      )}
      <div className={view === "list" ? style.List : style.Grid}>
        {children}
      </div>
    </div>
  );
};
