import { FileBase64 } from "@/types/file";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-tailwind/react";
import clsx from "clsx";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";

export type FileInputProps = {
  onChange: (file: File[]) => void;
};

export default function FileInput(props: FileInputProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      props.onChange(acceptedFiles);
    },
    [props]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div {...getRootProps()} className={clsx(["flex flex-row items-center w-full px-4"])}>
      <div {...getRootProps()} className="flex flex-1 justify-center items-center h-full">
        <Button className="rounded-full bg-blue-700 w-full" size="sm" onClick={() => inputRef.current?.click()}>
          <div className="flex flex-row gap-2 items-center justify-center">
            <FontAwesomeIcon icon={isDragActive ? faDownload : faUpload} />
            <span className="normal-case">{isDragActive ? "Drop to upload" : "Upload files"}</span>
            <input {...getInputProps()} />
          </div>
        </Button>
      </div>
    </div>
  );
}
