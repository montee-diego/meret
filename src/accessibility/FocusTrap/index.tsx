import type { HTMLAttributes, ReactNode } from "react";

import { useEffect, useRef } from "react";
import { getIsFocusable, getTabbable } from "@accessibility/tabbable";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  cancelEvent: () => void;
  children: ReactNode;
}

export default function FocusTrap({ active, cancelEvent, children, ...props }: IProps) {
  const lastFocus = useRef<Element | null>(null);
  const triggerFocus = useRef<Element | null>(null);
  const trapFocus = useRef<HTMLDivElement | null>(null);

  function setFocus(): void {
    const tabbable = getTabbable(trapFocus.current);

    if (tabbable.length) {
      lastFocus.current = tabbable[0];

      if (lastFocus.current instanceof HTMLElement) {
        lastFocus.current.focus();
      }
    }
  }

  function handleMouseDown(event: MouseEvent | TouchEvent): void {
    const target = event.target as HTMLElement;
    const isFocusable = getIsFocusable(target);

    if (trapFocus.current && target instanceof HTMLElement) {
      if (!trapFocus.current.contains(target)) {
        if (!isFocusable) {
          event.preventDefault();
        }
        cancelEvent();
      } else {
        if (isFocusable) {
          lastFocus.current = target;
        }
      }
    }
  }

  function handleKeyDown(event: KeyboardEvent): void {
    const tabbable = getTabbable(trapFocus.current);

    if (event.code === "Escape" || event.key === "Escape") {
      cancelEvent();
    } else if (event.code === "Tab" || event.key === "Tab") {
      if (!tabbable.length) {
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

      const first = tabbable[0];
      const last = tabbable[tabbable.length - 1];

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
  }

  function handleFocus(event: FocusEvent): void {
    if (lastFocus.current && lastFocus.current instanceof HTMLElement) {
      lastFocus.current.focus();
    }
  }

  function handleFocusIn(event: FocusEvent): void {
    const tabbable = getTabbable(trapFocus.current);
    const target = event.target as HTMLElement;
    const isValid = tabbable.some((node) => node === target);

    if (trapFocus.current && target instanceof HTMLElement) {
      if (trapFocus.current.contains(target) && isValid) {
        lastFocus.current = target;
      }
    }
  }

  function addListeners(): void {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("touchend", handleMouseDown);
    document.addEventListener("focus", handleFocus);
    document.addEventListener("focusin", handleFocusIn);
  }

  function removeListeners(): void {
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("touchend", handleMouseDown);
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
    <div {...props} ref={trapFocus} tabIndex={-1}>
      {children}
    </div>
  );
}
