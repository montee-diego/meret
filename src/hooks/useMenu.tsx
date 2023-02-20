import type { MouseEvent, ReactElement, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import Menu from "@components/Menu";

interface IProps {
  children: ReactNode;
}

type MenuTuple = [
  (e: MouseEvent<HTMLButtonElement>) => void,
  (props: IProps) => ReactElement | null
];

export const useMenu = (): MenuTuple => {
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

  function calcXPosition(parent: Element, menuWidth: number) {
    if (!trigger) return {};

    const { clientWidth, offsetLeft } = trigger;

    if (offsetLeft + menuWidth > parent.clientWidth) {
      return { right: parent.clientWidth - (offsetLeft + clientWidth) };
    } else {
      return { left: offsetLeft };
    }
  }

  function calcYPosition(parent: Element, menuHeight: number) {
    if (!trigger) return {};

    const { clientHeight, offsetTop } = trigger;

    if (offsetTop + clientHeight + menuHeight > parent.clientHeight + parent.scrollTop) {
      return { top: offsetTop - menuHeight };
    } else {
      return { top: clientHeight + offsetTop };
    }
  }

  function calcMenuStyle(menuHeight: number, menuWidth: number): {} {
    if (!trigger) return {};

    const { offsetParent } = trigger;
    let computed = {};

    if (offsetParent) {
      const alignX = calcXPosition(offsetParent, menuWidth);
      const alignY = calcYPosition(offsetParent, menuHeight);

      computed = { ...alignX, ...alignY };
    }

    return computed;
  }

  function RenderMenu({ children }: IProps) {
    const [style, setStyle] = useState<{}>({});
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const menuHeight = menuRef.current?.clientHeight || 0;
      const menuWidth = menuRef.current?.clientWidth || 0;
      const computedStyle = calcMenuStyle(menuHeight, menuWidth);

      setStyle(computedStyle);
    }, []);

    if (isOpen) {
      return (
        <Menu toggleOpen={closeMenu} style={style} ref={menuRef}>
          {children}
        </Menu>
      );
    } else {
      return null;
    }
  }

  return [openMenu, RenderMenu];
};
