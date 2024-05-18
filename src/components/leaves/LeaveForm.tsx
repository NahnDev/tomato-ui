import { Card, CardBody, CardFooter, Input } from "@material-tailwind/react";
import React from "react";
import FormProvider from "../share/FormProvider";
import InlineInput from "../share/InlineInput";
import ProcessButton from "../share/ProcessButton";

export default function LeaveForm(
  props: Readonly<{
    onClose: () => any;
  }>
) {
  return (
    <Card>
      <CardBody>
        <FormProvider>
          <div className="flex flex-col gap-2">
            <Input type="date" label="Date"></Input>
            <Input label="Reason"></Input>
          </div>
        </FormProvider>
        <CardFooter className="flex flex-row">
          <div className="flex-1"></div>
          <ProcessButton label="Submit"></ProcessButton>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
