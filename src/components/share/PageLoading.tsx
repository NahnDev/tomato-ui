import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function PageLoading() {
  return (
    <div className="flex items-center justify-center h-full animate-pulse">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin text-red-500 text-5xl" />
    </div>
  );
}
