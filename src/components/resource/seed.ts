import { FileTypes } from "./ResourceIcon";

export const ROOT_DIRECTORY = "root";
export type TFile = {
  _id: string;
  path: string;
  mimetype: string;
};

export type TResourceItem = {
  _id: string;
  title: string;
  directory?: string;
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
    file: { _id: "121", path: "/", mimetype: FileTypes.IMAGE },
    directory: ROOT_DIRECTORY,
  },
  {
    _id: "7",
    title: "Document 2",
    isDirectory: false,
    directory: "2",
    file: { _id: "121", path: "/", mimetype: FileTypes.EXCEL },
  },
  {
    _id: "8",
    title: "Document 3",
    isDirectory: false,
    directory: "1",
    file: { _id: "121", path: "/", mimetype: FileTypes.WORD },
  },
];
