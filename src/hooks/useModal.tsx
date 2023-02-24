import type { ReactElement, ReactNode } from "react";
import { useCallback, useState } from "react";

import Modal from "@components/Modal";

interface IProps {
  children: ReactNode;
}

type ModalTuple = [() => void, () => void, (props: IProps) => ReactElement | null];

export const useModal = (): ModalTuple => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  // useCallback prevents re-render flicker when the AudioPlayer context updates
  const RenderModal = useCallback(
    function RenderModal(props: IProps) {
      if (isOpen) {
        return <Modal closeModal={close}>{props.children}</Modal>;
      } else {
        return null;
      }
    },
    [isOpen]
  );

  return [open, close, RenderModal];
};
