import type { FC, ReactNode } from "react";

import { useEffect, useRef } from "react";
import { tabbable } from "@accessibility/tabbable";

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

  const setFocus = (): void => {
    const tabable = tabbable(trap.current);

    if (tabable.length) {
      lastFocus.current = tabable[0];

      if (lastFocus.current instanceof HTMLElement) {
        lastFocus.current.focus();
      }
    }
  };

  const handleMouseDown = (event: MouseEvent | TouchEvent): void => {
    const target = event.target;

    if (trap.current && target instanceof HTMLElement) {
      if (!trap.current.contains(target)) {
        event.preventDefault();
        cancelEvent();
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    const tabable = tabbable(trap.current);

    if (event.code === "Escape" || event.key === "Escape") {
      cancelEvent();
    } else if (event.code === "Tab" || event.key === "Tab") {
      if (!tabable.length) {
        event.preventDefault();
        return;
      }

      if (lastFocus.current !== event.target) {
        if (lastFocus.current instanceof HTMLElement) {
          lastFocus.current.focus();
          event.preventDefault();
          return;
        }
      }

      const first = tabable[0];
      const last = tabable[tabable.length - 1];

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

  const handleFocus = (event: FocusEvent): void => {
    if (lastFocus.current && lastFocus.current instanceof HTMLElement) {
      lastFocus.current.focus();
    }
  };

  const handleFocusIn = (event: FocusEvent): void => {
    const tabable = tabbable(trap.current);
    const target = event.target;
    const valid = tabable.some((node) => node === target);

    if (trap.current && target instanceof HTMLElement) {
      if (trap.current.contains(target) && valid) {
        lastFocus.current = target;
      }
    }
  };

  function addListeners(): void {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("touchstart", handleMouseDown);
    document.addEventListener("focus", handleFocus);
    document.addEventListener("focusin", handleFocusIn);
  }

  function removeListeners(): void {
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("touchstart", handleMouseDown);
    document.removeEventListener("focus", handleFocus);
    document.removeEventListener("focusin", handleFocusIn);
  }

  useEffect(() => {
    if (active) {
      if (document.activeElement instanceof HTMLElement) {
        triggerFocus.current = document.activeElement;
      }

      setFocus();
      addListeners();
    }

    return () => {
      removeListeners();

      if (triggerFocus.current instanceof HTMLElement) {
        triggerFocus.current.focus();
      }
    };
  }, [active]);

  return (
    <div className={className} ref={trap} tabIndex={-1}>
      {children}
    </div>
  );
};
