import React, { useMemo } from "react";
import { ControlProps } from "../types";
import Image from "next/image";

export default function Mockup(props: ControlProps) {
  const image = useMemo(() => props.control.config.mockup?.image, [props]);
  return (
    <div className="grid gap-4 grid-cols-1 h-full overflow-hidden">
      <div className="w-full h-full grid grid-rows-[1fr_auto_1fr] overflow-hidden">
        <div></div>
        {image && (
          <Image src={image.base64} alt={image.name} height={0} width={0} sizes="100vw" className="w-full h-auto" />
        )}
        <div></div>
      </div>
    </div>
  );
}
