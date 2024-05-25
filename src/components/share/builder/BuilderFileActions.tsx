import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { builderControlsState } from "./store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Archive from "@/utils/Archive";
import { read } from "fs";

const BuilderFileActions = () => {
  const [filename, setFilename] = useState("");
  const [controls, setControls] = useRecoilState(builderControlsState);

  const handleDownload = () => {
    Archive.download(controls, filename + ".template");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Archive.readJsonFile(file).then((controls) => {
        setControls([...controls]);
      });
    }
  };

  return (
    <div className="fluid p-2 flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Input
          type="text"
          label="Export"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          icon={<FontAwesomeIcon icon={faDownload} onClick={handleDownload} />}
        />
      </div>

      <div className="flex flex-row gap-2">
        <Input type="file" accept=".template" label="Import" onChange={handleFileUpload} />
      </div>
    </div>
  );
};

export default BuilderFileActions;
