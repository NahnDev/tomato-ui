"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function PlaningHeader() {
  return (
    <div className="flex flex-row justify-between rounded-lg bg-white text-slate-700 p-2">
      <div className="flex flex-row items-center gap-2"></div>
      <div className="p-2 flex flex-row items-center gap-2">
        <FontAwesomeIcon icon={faPlay} />
        <h3 className="font-bold uppercase">Sprint 132</h3>
      </div>
    </div>
  );
}
