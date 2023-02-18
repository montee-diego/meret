import type { MouseEvent, ReactElement, ReactNode } from "react";
import { Children, useState } from "react";

import Menu from "@components/Menu_v2";

interface IProps {
  align: "left" | "right";
  children: ReactNode;
}

type ModalTuple = [
  (e: MouseEvent<HTMLButtonElement>) => void,
  (props: IProps) => ReactElement | null
];

export const useMenu = (): ModalTuple => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  function openMenu(e: MouseEvent<HTMLButtonElement>) {
    if (e.target instanceof HTMLElement) {
      setTrigger(e.target);
      setIsOpen(true);
    }
  }

  function closeMenu() {
    setTrigger(null);
    setIsOpen(false);
  }

  // TO-DO: Refactor this function for readability
  function calculateMenuPosition(align: "left" | "right", children: ReactNode): {} {
    if (!trigger) return {};

    const { clientHeight, clientWidth, offsetLeft, offsetTop, offsetParent } = trigger;
    let computed = {};

    if (offsetParent) {
      const fontSize = Number(getComputedStyle(document.body).fontSize.slice(0, -2));
      const childrenCount = Children.toArray(children).length;
      // line-height * children + padding + distance
      const menuHeightInRems = 2.5 * childrenCount + 1 + 0.5;
      const parentHeight = offsetParent.clientHeight;
      const parentScroll = offsetParent.scrollTop;
      const parentWidth = offsetParent.clientWidth;

      if (offsetTop + clientHeight + fontSize * menuHeightInRems > parentHeight + parentScroll) {
        if (align === "left") {
          computed = {
            left: offsetLeft,
            top: offsetTop - fontSize * menuHeightInRems,
          };
        } else {
          computed = {
            right: parentWidth - (offsetLeft + clientWidth),
            top: offsetTop - fontSize * menuHeightInRems,
          };
        }
      } else {
        if (align === "left") {
          computed = {
            left: offsetLeft,
            top: clientHeight + offsetTop + fontSize * 0.5,
          };
        } else {
          computed = {
            right: parentWidth - (offsetLeft + clientWidth),
            top: clientHeight + offsetTop + fontSize * 0.5,
          };
        }
      }
    }

    return computed;
  }

  function RenderMenu({ align, children }: IProps) {
    const computedStyle = calculateMenuPosition(align, children);

    if (isOpen) {
      return (
        <Menu toggleOpen={closeMenu} style={computedStyle}>
          {children}
        </Menu>
      );
    } else {
      return null;
    }
  }

  return [openMenu, RenderMenu];
};
