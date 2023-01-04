import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return {
    isOpen,
    toggleOpen,
  };
};
