import Link from "next/link";

import Style from "./index.module.css";

interface IProps {
  title: string;
  href?: string;
}

export default function Title({ title, href }: IProps) {
  return (
    <div className={Style.Title}>
      <h3>{title}</h3>
      {href && (
        <Link className={Style.Link} href={href}>
          SHOW ALL
        </Link>
      )}
    </div>
  );
}
