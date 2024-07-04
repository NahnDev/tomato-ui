import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { Button, ButtonProps } from "@material-tailwind/react";
import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export type StateButtonProps = Readonly<
  {
    icon: IconProp;
    label: string;
    loading?: boolean;
    iconProps?: FontAwesomeIconProps;
    labelProps?: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
  } & Omit<ButtonProps, "children">
>;

export default function StateButton(props: StateButtonProps) {
  const { icon, label, iconProps, labelProps, ref, loading, ...buttonProps } = props;

  return (
    <Button
      {...buttonProps}
      className={clsx(["flex flex-row gap-2 items-center justify-center", props.className])}
      disabled={props.disabled || loading}
    >
      <FontAwesomeIcon
        icon={loading ? faSpinner : props.icon}
        className={clsx([props.iconProps?.className, loading && "animate-spin"])}
      />
      <span {...labelProps} className={clsx(["capitalize", labelProps?.className])}>
        {props.label}
      </span>
    </Button>
  );
}
