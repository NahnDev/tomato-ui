import { faCheckCircle, faPaperclip, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Input } from "@material-tailwind/react";
import { useCallback, useMemo } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import ResourceExplorer from "./ResourceExplorer";
import IconButton from "../share/button/IconButton";
import { useResourceSelected } from "./state";
import { TResourceItem } from "./type";

export type TResourcePickerProps = {
  onClose?: () => any;
  onSubmit?: (item: TResourceItem) => any;
  filter?: RegExp;
};
export default function ResourcePicker(props: TResourcePickerProps) {
  return (
    <Dialog
      open={true}
      handler={() => props.onClose?.()}
      className="rounded-lg max-h-[90vh] h-full overflow-hidden"
      size="sm"
    >
      <div className="grid grid-rows-[1fr_auto] fluid">
        <ResourceExplorer onClose={props.onClose} filter={props.filter} />
        <Picked onSubmit={props.onSubmit}></Picked>
      </div>
    </Dialog>
  );
}

export function UploaderFile(props: { onDrop: (files: File[]) => void }) {
  const onDrop: DropzoneOptions["onDrop"] = useCallback((acceptedFiles: any[]) => props.onDrop(acceptedFiles), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="w-60 h-80 grid grid-rows-[1fr_auto] p-2">
      <div className="rounded-lg border-2 border-slate-700 border-dashed">
        <div {...getRootProps()} className="flex justify-center items-center w-full h-full">
          <input {...getInputProps()} />

          <div className="flex flex-col gap-4">
            <FontAwesomeIcon className="text-2xl text-slate-700" icon={faUpload} />
            <span className="text-sm text-slate-700">Drag and drop files here</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Picked(props: { onSubmit?: (item: TResourceItem) => any }) {
  const [resource] = useResourceSelected();
  const file = useMemo(() => (resource?.isDirectory ? undefined : resource), [resource]);
  return (
    <div className="w-full p-4 flex flex-row gap-2 items-center">
      <Input
        className="flex-1 px-2"
        icon={<FontAwesomeIcon icon={faPaperclip} />}
        readOnly
        label="File selected"
        value={file?.title ?? ""}
      ></Input>
      <IconButton
        icon={faCheckCircle}
        className="text-green-500 text-lg"
        onClick={() => props.onSubmit?.(file!)}
        disabled={!resource}
      />
    </div>
  );
}
