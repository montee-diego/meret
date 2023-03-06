import type { MouseEvent, ReactElement, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import Menu from "@components/Menu";

interface IProps {
  children: ReactNode;
}

type MenuTuple = [
  (e: MouseEvent<HTMLButtonElement>) => void,
  (props: IProps) => ReactElement | null
];

function calcXPosition(trigger: HTMLElement, parent: Element, menuWidth: number) {
  const { clientWidth, offsetLeft } = trigger;

  if (offsetLeft + menuWidth > parent.clientWidth) {
    return { right: parent.clientWidth - (offsetLeft + clientWidth) };
  } else {
    return { left: offsetLeft };
  }
}

function calcYPosition(trigger: HTMLElement, parent: Element, menuHeight: number) {
  const { clientHeight, offsetTop } = trigger;

  if (offsetTop < menuHeight) {
    return { top: clientHeight + offsetTop };
  }

  if (offsetTop + clientHeight + menuHeight > parent.clientHeight + parent.scrollTop) {
    return { top: offsetTop - menuHeight };
  } else {
    return { top: clientHeight + offsetTop };
  }
}

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

  const calcMenuStyle = useCallback(
    function (menuHeight: number = 0, menuWidth: number = 0) {
      if (!trigger) return {};

      const { offsetParent } = trigger;
      let computed = {};

      if (offsetParent) {
        const alignX = calcXPosition(trigger, offsetParent, menuWidth);
        const alignY = calcYPosition(trigger, offsetParent, menuHeight);
        computed = { ...alignX, ...alignY };
      }

      return computed;
    },
    [trigger]
  );

  // useCallback prevents re-render flicker
  const RenderMenu = useCallback(
    function RenderMenu({ children }: IProps) {
      const [style, setStyle] = useState<{}>({});
      const menuRef = useRef<HTMLDivElement | null>(null);

      useEffect(() => {
        if (menuRef.current) {
          const { clientHeight, clientWidth } = menuRef.current;
          const computedStyle = calcMenuStyle(clientHeight, clientWidth);

          setStyle({ ...computedStyle, visibility: "visible" });
        }
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
    },
    [isOpen]
  );

  return [openMenu, RenderMenu];
};
