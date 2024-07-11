import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SettingPage() {
  return (
    <div className="fluid flex items-center justify-center">
      <FontAwesomeIcon icon={faGear} className="text-[20em] opacity-25" />
    </div>
  );
}
