import Link from "next/link";
import React from "react";
import { faExclamation, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotFoundPage() {
  return (
    <div className="w-screen h-screen justify-center items-center flex select-none">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className=" flex flex-row justify-center items-center gap-2">
          <span className="text-4xl border-r-2 px-2 border-black">404</span>
          <span>Not found</span>
          <FontAwesomeIcon className="text-yellow-500" icon={faExclamationTriangle}></FontAwesomeIcon>
        </div>
        <span className="text-sm font-light">
          Your url is not correct,{" "}
          <Link href="/" className="text-blue-600">
            return home
          </Link>
        </span>
      </div>
    </div>
  );
}
