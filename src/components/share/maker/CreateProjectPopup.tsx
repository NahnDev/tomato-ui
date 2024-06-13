import React, { useCallback } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import ImageUtil from "@/utils/ImageUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { TShape, TShapeType } from "./type";
import { useProject } from "./store/project";
import { Dialog, DialogBody } from "@material-tailwind/react";

type TEmptyScreenProps = Readonly<{}>;

export default function EmptyScreen(props: TEmptyScreenProps) {
  const [, setProject] = useProject();
  const handleCreated = (item: HTMLImageElement) => {
    const nodes: TShape[] = [
      {
        type: TShapeType.Image,
        x: -item.width / 2,
        y: -item.height / 2,
        width: item.width,
        height: item.height,
        image: item,
        id: new Date().getTime().toString(),
      },
    ];
    setProject({ width: item.width, height: item.height, shapes: nodes });
  };

  const onDrop: DropzoneOptions["onDrop"] = useCallback((acceptedFiles: any[]) => {
    ImageUtil.getImage(acceptedFiles[0]).then((image) => handleCreated(image));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <Dialog open={true} handler={() => {}}>
        <DialogBody>
          <div className="text-center text-slate-400 w-40 h-40 flex">
            <div className="border-2 border-slate-200 rounded-md flex flex-1">
              <div {...getRootProps()} className="flex flex-col justify-center items-center w-full h-full gap-2">
                <input {...getInputProps()} />
                <FontAwesomeIcon className="text-[3em] opacity-25" icon={faUpload} />
                <p className="text-xl">Project from image</p>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
