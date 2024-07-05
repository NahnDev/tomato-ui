import { FileTypes } from "./FileIcon";

export const ROOT_DIRECTORY = "root";
export type TFile = {
  _id: string;
  path: string;
  mineType: FileTypes;
};

export type TResourceItem = {
  _id: string;
  title: string;
  directory: string;
  isExpand?: boolean;
  isDirectory?: boolean;
  file?: TFile;
};

export const items: TResourceItem[] = [
  {
    _id: "1",
    title: "Documents",
    isDirectory: true,
    directory: ROOT_DIRECTORY,
  },
  {
    _id: "2",
    title: "Excels",
    isDirectory: true,
    directory: "1",
  },
  {
    _id: "3",
    title: "Images",
    isDirectory: true,

    directory: ROOT_DIRECTORY,
  },
  {
    _id: "4",
    title: "Videos",
    isDirectory: true,
    directory: ROOT_DIRECTORY,
  },
  {
    _id: "6",
    title: "Document 1",
    isDirectory: false,
    file: { _id: "121", path: "/", mineType: FileTypes.IMAGE },
    directory: ROOT_DIRECTORY,
  },
  {
    _id: "7",
    title: "Document 2",
    isDirectory: false,
    directory: "2",
    file: { _id: "121", path: "/", mineType: FileTypes.EXCEL },
  },
  {
    _id: "8",
    title: "Document 3",
    isDirectory: false,
    directory: "1",
    file: { _id: "121", path: "/", mineType: FileTypes.WORD },
  },
];
