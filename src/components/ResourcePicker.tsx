import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@material-tailwind/react";
import { useCallback } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import ResourceExplorer from "./resource/ResourceExplorer";

export type TResourcePickerProps = {
  onClose?: () => void;
};
export default function ResourcePicker(props: TResourcePickerProps) {
  return (
    <Dialog open={true} handler={() => {}} className="rounded-lg" size="sm">
      {/* <UploaderFile onDrop={() => {}} /> */}
      <ResourceExplorer onClose={props.onClose} />
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
