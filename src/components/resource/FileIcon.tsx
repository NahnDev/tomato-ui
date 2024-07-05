import {
  faFile,
  faFileAlt,
  faFileAudio,
  faFileExcel,
  faFileWord,
  faImage,
  faRadio,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export enum FileTypes {
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  WORD = "word",
  EXCEL = "excel",
  OTHER = "other",
}

export const ICONS = {
  [FileTypes.IMAGE]: { icon: faImage, color: "#FF5733" },
  [FileTypes.VIDEO]: { icon: faVideo, color: "#3498DB" },
  [FileTypes.AUDIO]: { icon: faFileAudio, color: "#8E44AD" },
  [FileTypes.WORD]: { icon: faFileWord, color: "#27AE60" },
  [FileTypes.EXCEL]: { icon: faFileExcel, color: "#F1C40F" },
  [FileTypes.OTHER]: { icon: faFile, color: "#95A5A6" },
};

export default function FileIcon(props: { type: FileTypes } & Omit<FontAwesomeIconProps, "icon">) {
  const { type, ...iconProps } = props;
  const icon = ICONS[type].icon ?? faFile;
  const color = ICONS[type].color ?? "#fff";
  return <FontAwesomeIcon {...iconProps} icon={icon} color={color} />;
}
