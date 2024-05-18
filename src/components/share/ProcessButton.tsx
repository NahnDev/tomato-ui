import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography, Button } from "@material-tailwind/react";
import React, { PropsWithChildren } from "react";

export type ProcessButtonProps = Readonly<{
  disabled?: boolean;
  loading?: boolean;
  loadingMessage?: string;
  label?: string;
  cancelLabel?: string;

  onSubmit?: () => any;
  onCancel?: () => any;
}>;

export default function ProcessButton(props: ProcessButtonProps) {
  if (props.loading)
    return (
      <div className="relative flex gap-2 items-center">
        <div className="flex gap-2 justify-center">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin"></FontAwesomeIcon>
          <Typography className="text-sm text-gray-500">{props.loadingMessage}</Typography>
        </div>
        <Button color="gray" onClick={props.onCancel} size="sm">
          {props.cancelLabel ?? "Cancel"}
        </Button>
      </div>
    );
  return (
    <Button disabled={props.disabled} color="red" onClick={props.onSubmit}>
      {props.label ?? "Submit"}
    </Button>
  );
}
