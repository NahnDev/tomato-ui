import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

export type CheckboxProps = {
  label?: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
  style?: React.CSSProperties;
  className?: string;
};

export default function Checkbox(props: CheckboxProps) {
  const { checked, label, onChange, ...otherProps } = props;
  return (
    <div
      {...otherProps}
      className={clsx([
        "flex-1",
        "flex items-center gap-2 p-2",
        "cursor-pointer select-none",
        "rounded-lg",
        props.className,
      ])}
      onClick={() => props.onChange(!props.checked)}
    >
      <FontAwesomeIcon
        icon={props.checked ? faCircleCheck : faCircle}
        color={props.checked ? "text-blue-gray-500" : "text-blue-gray"}
      />
      <span>{props.label ?? ""}</span>
    </div>
  );
}
