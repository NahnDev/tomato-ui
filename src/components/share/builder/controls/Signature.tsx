import { Button as MTButton } from "@material-tailwind/react";
import React, { useState } from "react";
import ReactSignatureCanvas from "react-signature-canvas";
import { ControlProps } from "../types";
import InputWrapper from "../../InputWrapper";
import SizeBox from "../../SizeBox";

export default function Signature(props: ControlProps) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  return (
    <InputWrapper label={props.control.config.label}>
      <SizeBox className="w-full h-full " onResize={setSize}>
        <ReactSignatureCanvas penColor="red" canvasProps={{ width: size.w, height: size.h }}></ReactSignatureCanvas>
      </SizeBox>
    </InputWrapper>
  );
}
