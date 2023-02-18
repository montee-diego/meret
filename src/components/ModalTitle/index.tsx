import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import ButtonIcon from "@components/ButtonIcon";
import style from "./index.module.css";

interface IProps {
  title: string;
  toggleOpen: () => void;
}

export default function ModalTitle({ title, toggleOpen }: IProps) {
  return (
    <div className={style.Title}>
      <h3>{title}</h3>

      <ButtonIcon onClick={toggleOpen} aria-label="close modal">
        <Icon icon={faXmark} size={"xl"} />
      </ButtonIcon>
    </div>
  );
}
