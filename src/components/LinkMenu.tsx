import useIsActiveRoute from "@/hooks/useIsActiveRoute";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";
import clsx from "clsx";
import { access } from "fs";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { active } from "sortablejs";

type TLinkMenuProps = Readonly<PropsWithChildren<{ href: string; icon: IconProp; className?: string }>>;
export default function LinkMenu(props: TLinkMenuProps) {
  const isActive = useIsActiveRoute(props.href);
  return (
    <Link
      href={props.href}
      className={clsx([
        "flex flex-row items-center gap-2 p-1 text-sm",
        isActive ? "text-red-500" : "text-slate-700",
        props.className,
      ])}
    >
      <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
      <span className="pt-1">{props.children}</span>
    </Link>
  );
}
