import { APP_ICONS, TIconKey } from "@/constants";
import { nil } from "@/types";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBody, IconButton } from "@material-tailwind/react";
import clsx from "clsx";
import React, { useMemo } from "react";
import { useBoolean } from "usehooks-ts";
import { useForm } from "./FormProvider";

export type TTemplateIconProps = Readonly<{
  value: nil<TIconKey>;
  onChange: (value: nil<TIconKey>) => any;
}>;

export default function IconInput(props: TTemplateIconProps) {
  const { value: shownAll, setFalse: close, setTrue: open } = useBoolean();
  const icons = useMemo(() => Object.keys(APP_ICONS) as TIconKey[], []);

  const { disabled } = useForm();

  return (
    <div>
      <div className="flex flex-row gap-2">
        <IconButton
          disabled={disabled}
          onClick={open}
          variant="text"
          className={clsx([
            "border-[1px] border-gray-300 rounded-md size-10 text-base",
            props.value && " border-red-500",
          ])}
        >
          {props.value && <FontAwesomeIcon icon={APP_ICONS[props.value]}></FontAwesomeIcon>}
        </IconButton>
        <Dialog open={shownAll} handler={close}>
          <DialogBody>
            {icons.map((key) => (
              <Icon
                icon={key}
                key={key}
                onClick={() => {
                  props.onChange(key);
                  close();
                }}
              ></Icon>
            ))}
          </DialogBody>
        </Dialog>
      </div>
    </div>
  );
}

function Icon(props: Readonly<{ icon: TIconKey; onClick?: () => any; className?: string }>) {
  return (
    <IconButton onClick={props.onClick} variant="text" className={clsx(["text-base", props.className])}>
      <FontAwesomeIcon icon={APP_ICONS[props.icon]}></FontAwesomeIcon>
    </IconButton>
  );
}
