import { faL, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography, Button } from "@material-tailwind/react";
import React, { PropsWithChildren, useState } from "react";
import { useBoolean } from "usehooks-ts";

export type ProcessButtonProps = Readonly<
  PropsWithChildren<{
    disabled?: boolean;
    fallback: string;
    handler: Function;
  }>
>;

export default function ProgressButton(props: ProcessButtonProps) {
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState<unknown>();

  const onStartClicked = async () => {
    setWaiting(true);
    try {
      await props.handler();
    } catch (error) {
      setError(error);
    } finally {
      setWaiting(false);
    }
  };

  if (waiting)
    return (
      <div className="relative flex gap-2 items-center p-2">
        <div className="flex gap-2 justify-center">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin"></FontAwesomeIcon>
          <Typography className="text-sm text-gray-500">{props.fallback}</Typography>
        </div>
      </div>
    );
  return (
    <Button disabled={props.disabled} color="red" onClick={onStartClicked}>
      {props.children}
    </Button>
  );
}
