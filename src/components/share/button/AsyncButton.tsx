import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { Button, ButtonProps } from "@material-tailwind/react";
import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren, ReactNode, use, useRef } from "react";
import useAsyncFn from "react-use/lib/useAsyncFn";

export type AsyncButtonProps = Readonly<
  {
    icon: IconProp;
    label: string;
    onClick: () => Promise<any>;
    iconProps?: FontAwesomeIconProps;
    labelProps?: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
  } & Omit<ButtonProps, "children">
>;

export default function AsyncButton(props: AsyncButtonProps) {
  const { icon, label, onClick, iconProps, labelProps, ref, ...buttonProps } = props;
  const [state, handler] = useAsyncFn(onClick);

  return (
    <Button
      {...buttonProps}
      className={clsx(["flex flex-row gap-2 items-center justify-center", props.className])}
      onClick={handler}
      disabled={props.disabled || state.loading}
    >
      <FontAwesomeIcon
        icon={state.loading ? faSpinner : props.icon}
        className={clsx([props.iconProps?.className, state.loading && "animate-spin"])}
      />
      <span {...labelProps} className={clsx(["capitalize", labelProps?.className])}>
        {props.label}
      </span>
    </Button>
  );
}
