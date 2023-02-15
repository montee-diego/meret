import type { ReactNode } from "react";
import type { LinkProps } from "next/link";
import { forwardRef } from "react";
import Link from "next/link";

import css from "./index.module.css";

interface IProps extends LinkProps {
  align: "left" | "center" | "right";
  children: ReactNode;
}

export default forwardRef<HTMLAnchorElement, IProps>(function ButtonLink(props, ref) {
  const { align, children } = props;

  return (
    <Link {...props} className={css.Link} data-align={align} ref={ref}>
      {children}
    </Link>
  );
});
