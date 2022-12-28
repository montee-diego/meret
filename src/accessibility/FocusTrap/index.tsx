import { useEffect, useRef } from "react";
import { tabbable } from "@accessibility/tabbable";
import type { FC, KeyboardEvent, ReactNode, SyntheticEvent } from "react";

interface IProps {
  active: boolean;
  cancelEvent: () => void;
  className: string;
  children: ReactNode;
}

export const FocusTrap: FC<IProps> = ({ active, cancelEvent, className, children }) => {
  const lastFocus = useRef<Element | null>(null);
  const triggerFocus = useRef<Element | null>(null);
  const trap = useRef<HTMLDivElement | null>(null);

  const setFocus = (target: HTMLDivElement | null): void => {
    if (target) {
      const tabable = tabbable(target);

      tabable[0].focus();
    }
  };

  const handleClick = (event: SyntheticEvent): void => event.stopPropagation();

  const handleKey = (event: KeyboardEvent): void => {
    const tabable = tabbable(event.currentTarget);

    if (event.code === "Escape") {
      cancelEvent();
    } else if (event.code === "Tab") {
      const first: HTMLElement = tabable[0];
      const last: HTMLElement = tabable[tabable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          event.preventDefault();
        }
      }
    }
  };

  const handleFocus = (): void => {
    if (trap.current) {
      if (trap.current.contains(document.activeElement)) {
        return;
      }
    }

    if (lastFocus.current instanceof HTMLElement) {
      lastFocus.current.focus();
    } else {
      setFocus(trap.current);
    }
  };

  const handleBlur = (): void => {
    lastFocus.current = document.activeElement;
  };

  useEffect(() => {
    if (active) {
      triggerFocus.current = document.activeElement;

      setFocus(trap.current);

      window.addEventListener("focus", handleFocus);
      window.addEventListener("blur", handleBlur);
    } else {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);

      if (triggerFocus.current instanceof HTMLElement) {
        triggerFocus.current.focus();
      }
    }

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);

      if (triggerFocus.current instanceof HTMLElement) {
        triggerFocus.current.focus();
      }
    };
  }, [active]);

  return (
    <div className={className} ref={trap} onKeyDown={handleKey} tabIndex={-1} onClick={handleClick}>
      {children}
    </div>
  );
};
