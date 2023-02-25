import type { ReactNode } from "react";
import type { Toast } from "react-hot-toast";
import { toast } from "react-hot-toast";

import Style from "./index.module.css";

interface IProps {
  children: ReactNode;
  onClick: () => void;
  t: Toast;
}

export default function ActionToast({ children, onClick, t }: IProps) {
  function handleClick() {
    onClick();
    toast.dismiss(t.id);
  }

  return (
    <div className={Style.Message}>
      <span>{children}</span>
      <button type="button" className={Style.Btn} onClick={handleClick}>
        Retry
      </button>
    </div>
  );
}
