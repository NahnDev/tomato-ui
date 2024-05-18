import useIsActiveRoute from "@/hooks/useIsActiveRoute";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListItem, Typography } from "@material-tailwind/react";
import Link from "next/link";
import React, { useMemo } from "react";

export default function TemplateThumbnail(props: Readonly<{ name: string; id: string; icon: IconProp }>) {
  const href = useMemo(() => `/workspace/templates/${props.id}`, [props.id]);
  const isActive = useIsActiveRoute(href);
  return (
    <Link href={href}>
      <ListItem>
        <Typography
          as="li"
          variant="small"
          color={isActive ? "red" : "blue-gray"}
          className="flex items-center justify-center gap-x-4 p-1 font-bold"
        >
          <FontAwesomeIcon icon={props.icon} className="text-lg"></FontAwesomeIcon>
          <span>{props.name}</span>
        </Typography>
      </ListItem>
    </Link>
  );
}
