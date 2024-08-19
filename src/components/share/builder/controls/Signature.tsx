import { Button as MTButton } from "@material-tailwind/react";
import React, { useState } from "react";
import ReactSignatureCanvas from "react-signature-canvas";
import { ControlProps } from "../types";
import InputWrapper from "../../InputWrapper";
import SizeBox from "../../SizeBox";

export default function Signature(props: ControlProps) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  return (
    <SizeBox className="w-full h-full shadow-sm shadow-gray-200" onResize={setSize}>
      <ReactSignatureCanvas penColor="black" canvasProps={{ width: size.width, height: size.height }} />
    </SizeBox>
  );
}
