import useIsActiveRoute from "@/hooks/useIsActiveRoute";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function LinkMenu(props: Readonly<PropsWithChildren<{ href: string; icon: IconProp }>>) {
  const isActive = useIsActiveRoute(props.href);
  return (
    <Typography
      as="li"
      variant="small"
      color={isActive ? "red" : "blue-gray"}
      className="flex items-center gap-x-2 p-1 font-medium"
    >
      <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
      <Link href={props.href} className="flex items-center">
        {props.children}
      </Link>
    </Typography>
  );
}
