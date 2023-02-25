import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";

import Style from "./index.module.css";

export default function Loading() {
  return (
    <div className={Style.Icon}>
      <Icon icon={faCompactDisc} size="3x" spin />
    </div>
  );
}
