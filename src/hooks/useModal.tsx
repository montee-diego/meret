import { useState } from "react";

type ModalTuple = [boolean, () => void];

export const useModal = (): ModalTuple => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return [isOpen, toggleOpen];
};
