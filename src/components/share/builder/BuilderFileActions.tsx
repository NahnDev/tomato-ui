import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { document, documentControls } from "./state/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPrint } from "@fortawesome/free-solid-svg-icons";
import Archive from "@/utils/Archive";
import { read } from "fs";
import { ReactToPrint, useReactToPrint } from "react-to-print";
import IconButton from "../button/IconButton";
import FileInput from "../FileInput";

const BuilderFileActions = () => {
  const [filename, setFilename] = useState("");
  const [doc, setDoc] = useRecoilState(document);

  const handleDownload = () => {
    Archive.download(doc, filename + ".template");
  };

  const handleFileUpload = (files: File[]) => {
    const file = files[0];
    if (file) {
      Archive.readJsonFile(file).then((doc) => setDoc(doc));
    }
  };

  const handlePrint = useReactToPrint({
    content: () => window.document.getElementById("builder") as HTMLElement,
  });

  return (
    <div className="w-full grid grid-cols-1 gap-2 p-2">
      <FileInput onChange={handleFileUpload} />

      <div className="px-4 w-full">
        <Button
          className="flex flex-row gap-2 py-2 rounded-full items-center justify-center bg-brown-600 w-full normal-case"
          onClick={handleDownload}
        >
          <FontAwesomeIcon icon={faDownload} />
          <span>Export</span>
        </Button>
      </div>
      <div className="px-4">
        <Button
          variant="text"
          className="flex flex-row gap-2 py-2 rounded-full items-center justify-center w-full normal-case"
          onClick={handlePrint}
        >
          <FontAwesomeIcon icon={faPrint} />
          <span>Print preview</span>
        </Button>
      </div>
    </div>
  );
};

export default BuilderFileActions;
