import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography } from "@material-tailwind/react";
import React, { Suspense, useMemo, useState } from "react";
import IconInput from "../share/IconInput";
import { TIconKey } from "@/constants";
import { nil } from "@/types";
import InlineInput from "../share/InlineInput";
import { useBoolean } from "usehooks-ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import FormProvider from "../share/FormProvider";
import ProcessButton from "../share/ProcessButton";

export type TemplateCreatorProps = Readonly<{
  open: boolean;
  onClose: () => any;
}>;

export default function TemplateCreator(props: TemplateCreatorProps) {
  const { value: processing, setTrue: start, setFalse: stop } = useBoolean();
  const [icon, setIcon] = useState<nil<TIconKey>>(null);
  const [name, setName] = useState("");
  const isValid = useMemo(() => icon && name, [icon, name]);

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
        <ProcessButton
          loading={processing}
          disabled={!isValid}
          loadingMessage="Creating template, please wait"
          label="Create a template"
          onSubmit={start}
          onCancel={stop}
        ></ProcessButton>
      </DialogFooter>
    </Dialog>
  );
}
