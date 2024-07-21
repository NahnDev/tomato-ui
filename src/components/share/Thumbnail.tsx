import useIsActiveRoute from "@/hooks/useIsActiveRoute";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListItem, Typography } from "@material-tailwind/react";
import Link from "next/link";
import React, { useMemo } from "react";

export type TThumbnailProps = Readonly<{ name: string; icon: IconProp; href: string; expand: boolean }>;
export default function Thumbnail(props: TThumbnailProps) {
  const isActive = useIsActiveRoute(props.href);
  return (
    <Link href={props.href}>
      <ListItem className="!h-12 p-0">
        <Typography
          as="li"
          variant="small"
          color={isActive ? "red" : "blue-gray"}
          className="flex items-center justify-center font-bold"
        >
          <FontAwesomeIcon icon={props.icon} className="text-lg w-12"></FontAwesomeIcon>
          {props.expand && <span>{props.name}</span>}
        </Typography>
      </ListItem>
    </Link>
  );
}
