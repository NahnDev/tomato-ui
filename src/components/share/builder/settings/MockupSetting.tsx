import React, { useCallback, useMemo, useRef, useState } from "react";
import { TControlSettingProps } from "../ControlSetting";
import { useSetSettingControl } from "../hooks";
import { faCheck, faDownload, faSpinner, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { TControlSetting } from "@/types/control";
import Heading from "./Heading";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-tailwind/react";
import clsx from "clsx";
import ImageUtil from "@/utils/ImageUtil";
import IconButton from "../../button/IconButton";
import { FileBase64 } from "@/types/file";
import Image from "next/image";

export const MockupDefaultSetting = {} as Exclude<TControlSetting["mockup"], undefined>;

export default function MockupSetting(props: TControlSettingProps) {
  const updateControlSetting = useSetSettingControl(props.id);
  const mockupSetting = useMemo(() => ({ ...MockupDefaultSetting, ...props.data.mockup }), [props]);
  const image = useMemo(() => mockupSetting.image, [mockupSetting]);

  const handleChange = useCallback(
    (params: Partial<TControlSetting["mockup"]>) => {
      updateControlSetting({ mockup: { ...mockupSetting, ...params } });
    },
    [updateControlSetting, mockupSetting]
  );

  const handleAdd = useCallback(
    (image: FileBase64) => {
      handleChange({ image });
    },
    [handleChange]
  );

  const handleDelete = (id: FileBase64["id"]) => {
    handleChange({ image: undefined });
  };

  const onDrop: DropzoneOptions["onDrop"] = useCallback(
    async (acceptedFiles: any[]) => {
      handleAdd(await ImageUtil.toBase64(acceptedFiles[0]));
    },
    [handleAdd]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(1);
  const isPending = useMemo(() => loading && percent !== 1, [loading, percent]);

  return (
    <div className="p-2">
      <Heading label="Mockup" />
      <div {...getRootProps()} className="flex flex-row items-center w-full px-4">
        <div {...getRootProps()} className="flex flex-1 justify-center items-center h-full">
          <Button className="rounded-full bg-blue-700 w-full" size="sm" onClick={() => inputRef.current?.click()}>
            <div className="flex flex-row gap-2 items-center justify-center">
              {!isDragActive ? (
                <>
                  <FontAwesomeIcon
                    icon={loading ? (isPending ? faSpinner : faCheck) : faUpload}
                    className={clsx([isPending && "animate-spin"])}
                  />
                  <span className="normal-case">
                    {loading ? (isPending ? `${Math.round(percent * 100)}%` : "Success") : "Upload files"}
                  </span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faDownload} />
                  <span className="normal-case">Drop to upload</span>
                </>
              )}
              <input {...getInputProps()} />
            </div>
          </Button>
        </div>
      </div>
      {image && (
        <div className="overflow-hidden py-4">
          <div
            className={clsx([
              "flex flex-row items-center gap-2",
              "w-full overflow-x-hidden",
              "cursor-pointer group relative",
            ])}
          >
            <span className="pl-2 text-nowrap flex-1 text-sm overflow-hidden text-ellipsis">{image.name}</span>
            <IconButton icon={faTrash} onClick={() => handleDelete(image.id)} />
            <div
              className={clsx([
                "fixed z-50 bottom-2 right-2",
                "w-80 h-min  rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 duration-500",
                "shadow-md shadow-slate-500",
                "hidden group-hover:flex ",
              ])}
            >
              <Image
                src={image.base64}
                alt={image.name}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
