import { Button as MTButton } from "@material-tailwind/react";
import React, { useCallback } from "react";
import { ControlProps } from "../types";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../../button/IconButton";
import { faFile, faFileImage, faImage, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";

export default function UploaderFile(props: ControlProps) {
  const onDrop: DropzoneOptions["onDrop"] = useCallback((acceptedFiles: any[]) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="w-full h-full grid grid-rows-[1fr_auto]">
      <div className="border-2 border-slate-200 rounded-md">
        <div {...getRootProps()} className="flex justify-center items-center w-full h-full">
          <input {...getInputProps()} />
          <FontAwesomeIcon className="text-[3em] opacity-25" icon={faFile} />
          {/* {isDragActive ? <p>Drop the files here ...</p> : <p>Drag drop some files here, or click to select files</p>} */}
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex-1"></div>
        <IconButton icon={faUpload} />
        <IconButton icon={faTrash} />
      </div>
    </div>
  );
}
