import React from "react";
import { IconButton as MTIconButton } from "@material-tailwind/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconButton(props: Readonly<{ icon: IconProp }>) {
  return (
    <MTIconButton variant="text">
      <FontAwesomeIcon icon={props.icon} />
    </MTIconButton>
  );
}
