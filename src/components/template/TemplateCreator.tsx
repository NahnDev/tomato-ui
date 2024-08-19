import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography } from "@material-tailwind/react";
import React, { Suspense, useMemo, useState } from "react";
import IconInput from "../share/IconInput";
import { IconKeys } from "@/constants/icon";
import { nil } from "@/types";
import InlineInput from "../share/InlineInput";
import { useBoolean } from "usehooks-ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import FormProvider from "../share/FormProvider";
import ProgressButton from "../share/button/ProgressButton";
import { resolve } from "path";
import wait from "@/utils/wait";

export type TemplateCreatorProps = Readonly<{
  open: boolean;
  onClose: () => any;
}>;

export default function TemplateCreator(props: TemplateCreatorProps) {
  const { value: processing, setTrue: start, setFalse: stop } = useBoolean();
  const [icon, setIcon] = useState<nil<IconKeys>>(null);
  const [name, setName] = useState("");
  const isValid = useMemo(() => icon && name, [icon, name]);

  const onSubmit = () => wait(5000);

  if (!props.open) return <></>;
  return (
    <Dialog open={true} handler={props.onClose} size="sm">
      <DialogHeader>
        <Typography as={"h4"} className="font-bold text-center">
          Create a template
        </Typography>
      </DialogHeader>
      <DialogBody>
        <FormProvider disabled={processing}>
          <div className={clsx(["flex flex-row gap-2"])}>
            <IconInput value={icon} onChange={setIcon}></IconInput>
            <InlineInput value={name} onChangeText={setName}></InlineInput>
          </div>
        </FormProvider>
      </DialogBody>
      <DialogFooter>
        <ProgressButton disabled={!isValid} fallback="Creating template, please wait" handler={onSubmit}>
          Create a template
        </ProgressButton>
      </DialogFooter>
    </Dialog>
  );
}
