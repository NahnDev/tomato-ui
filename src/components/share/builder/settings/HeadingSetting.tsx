import React, { PropsWithChildren, useMemo } from "react";
import { TControlSettingProps } from "../ControlSetting";
import { useSetSettingControl } from "../hooks";
import { Input, IconButton as MTIconButton } from "@material-tailwind/react";
import clsx from "clsx";
import { THeadingSetting } from "@/types/control";
import ColorPicker from "../../ColorPicker";
import Heading from "./Heading";

export default function HeadingSetting(props: TControlSettingProps) {
  const updateControlSetting = useSetSettingControl(props.id);
  const headingSetting = useMemo(() => props.data.heading, [props.data.heading]);

  const updateHeading = (params: Partial<THeadingSetting>) => {
    updateControlSetting({ heading: { ...headingSetting, ...params } });
  };

  return (
    <div className="p-2">
      <Heading label="Heading" />
      <div className="px-2 flex flex-row gap-1 items-center">
        <Input
          containerProps={{ className: "!min-w-0 max-w-32 hidden-arrow" }}
          className="text-center"
          label="Styles"
          type="text"
          value={headingSetting?.format ?? ""}
          onChange={(e) => updateHeading({ format: e.target.value })}
        ></Input>
        <ColorPicker value={headingSetting?.color} onChange={(color) => updateHeading({ color })} />
        <Button active={headingSetting?.level === 1} onClick={() => updateHeading({ level: 1 })}>
          H1
        </Button>
        <Button active={headingSetting?.level === 2} onClick={() => updateHeading({ level: 2 })}>
          H2
        </Button>
        <Button active={headingSetting?.level === 3} onClick={() => updateHeading({ level: 3 })}>
          H3
        </Button>
      </div>
    </div>
  );
}

export function Button(props: Readonly<PropsWithChildren<{ onClick?: () => any; active?: boolean }>>) {
  return (
    <MTIconButton
      variant={props.active ? "filled" : "text"}
      className={clsx(["rounded-full w-8 h-8"])}
      onClick={props.onClick}
    >
      <span className="font-bold">{props.children}</span>
    </MTIconButton>
  );
}
