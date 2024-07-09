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
