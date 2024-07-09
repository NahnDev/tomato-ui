import {
  faFile,
  faFileAlt,
  faFileAudio,
  faFileCsv,
  faFileExcel,
  faFileWord,
  faFolder,
  faFolderOpen,
  faImage,
  faRadio,
  faSpinner,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { TResourceItem } from "./type";
import clsx from "clsx";

export enum FileTypes {
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  WORD = "word",
  EXCEL = "excel",
  OTHER = "other",
}

export const FILE_ICONS = [
  { icon: faImage, color: "#FF5733", mimetype: /^image/ },
  { icon: faVideo, color: "#3498DB", mimetype: /^video/ },
  { icon: faFileAudio, color: "#8E44AD", mimetype: /^audio/ },
  { icon: faFileWord, color: "#27AE60", mimetype: /^application\/msword/ },
  {
    icon: faFileCsv,
    color: "#166534",
    mimetype: /^text\/csv/,
  },
  { icon: faFile, color: "#1e293b", mimetype: /.*/ },
];

export type TResourceItemProps = { item: TResourceItem; open: boolean; isLoading: boolean } & Omit<
  FontAwesomeIconProps,
  "icon"
>;
export default function ResourceIcon(props: TResourceItemProps) {
  const { item, isLoading, open, ...iconProps } = props;
  const fileIcon = useMemo(() => {
    if (item.isDirectory) {
      if (isLoading) return { icon: faSpinner, color: "#1e293b" };
      return { icon: open ? faFolderOpen : faFolder, color: "#1e293b" };
    }
    return FILE_ICONS.find((icon) => icon.mimetype.test(item.file!.mimetype))!;
  }, [item, isLoading, open]);

  return (
    <FontAwesomeIcon
      {...iconProps}
      className={clsx([isLoading && "animate-spin", iconProps.className])}
      icon={fileIcon.icon}
      color={fileIcon.color}
    />
  );
}
