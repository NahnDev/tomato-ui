import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@material-tailwind/react";
import clsx from "clsx";

export default function SidebarButton(props: {
  expand: boolean;
  onToggle: () => void;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div
      className={clsx([
        "absolute right-0 bottom-2 translate-x-1/2 duration-500 group-hover:visible invisible",
        props.expand && "rotate-180",
        props.className,
      ])}
    >
      <IconButton size="sm" variant="text" className="rounded-full duration-200" onClick={props.onToggle}>
        <FontAwesomeIcon
          className={clsx(["text-lg text-slate-500 opacity-50", props.iconClassName])}
          icon={faChevronCircleRight}
        ></FontAwesomeIcon>
      </IconButton>
    </div>
  );
}
