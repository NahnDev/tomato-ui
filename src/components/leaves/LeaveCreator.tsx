import { Card, CardBody, CardFooter, Input, Textarea, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import FormProvider from "../share/FormProvider";
import InlineInput from "../share/InlineInput";
import ProgressButton from "../share/button/ProgressButton";
import wait from "@/utils/wait";

export default function LeaveCreator(props: Readonly<{ onClose: () => any }>) {
  const [disabled, setDisabled] = useState(false);
  const handleCreate = async () => {
    await wait(2000);
    props.onClose();
  };
  return (
    <Card>
      <CardBody>
        <div className="py-4">
          <Typography className="text-center font-semibold text-red-500">Leave request</Typography>
          <Typography className="text-center">Send request to manager approval</Typography>
        </div>
        <FormProvider>
          <div className="flex flex-col gap-2">
            <Input type="date" label="Date"></Input>
            <Textarea label="Reason"></Textarea>
          </div>
        </FormProvider>
        <div className="flex flex-row">
          <div className="flex-1"></div>
          <ProgressButton fallback="Creating leave request, please wait" handler={handleCreate}>
            Send request
          </ProgressButton>
        </div>
      </CardBody>
    </Card>
  );
}
