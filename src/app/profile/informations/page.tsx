import { faCheck, faPaste } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InformationPage() {
  return (
    <div className="fluid flex items-center justify-center">
      <FontAwesomeIcon icon={faPaste} className="text-[20em] opacity-25" />
    </div>
  );
}
