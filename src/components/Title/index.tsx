import Link from "next/link";

import css from "./index.module.css";

interface IProps {
  title: string;
  href?: string;
}

export default function Title({ title, href }: IProps) {
  return (
    <div className={css.Title}>
      <h3>{title}</h3>
      {href && <Link href={href}>SHOW ALL</Link>}
    </div>
  );
}
