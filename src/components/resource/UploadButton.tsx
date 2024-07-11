import { faCheck, faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-tailwind/react";
import { useMemo, useRef, useState } from "react";
import ResourceApi from "./api";
import { useResourceUpdateHandler, useResourceUploadHandler } from "./state";
import clsx from "clsx";
import { useDebounceCallback } from "usehooks-ts";

export default function UploadButton() {
  const [key, setKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(1);
  const isPending = useMemo(() => loading && percent !== 1, [loading, percent]);

  const completed = useDebounceCallback(() => setLoading(false), 2000);
  const upload = useResourceUploadHandler((e) => {
    setPercent(e.progress ?? 1);
    completed();
  });

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      try {
        setLoading(true);
        await upload(files[0]);
      } catch (error) {
        setKey((prev) => prev + 1);
        setLoading(false);
      }
    }
  };

  return (
    <Button className="rounded-full bg-blue-700" size="sm" onClick={() => inputRef.current?.click()}>
      <div className="flex flex-row gap-2 items-center">
        <FontAwesomeIcon
          icon={loading ? (isPending ? faSpinner : faCheck) : faUpload}
          className={clsx([isPending && "animate-spin"])}
        />
        <span className="capitalize w-12">
          {loading ? (isPending ? `${Math.round(percent * 100)}%` : "Success") : "Upload"}
        </span>
        <input key={key} ref={inputRef} type="file" className="hidden" onChange={onChange} />
      </div>
    </Button>
  );
}
