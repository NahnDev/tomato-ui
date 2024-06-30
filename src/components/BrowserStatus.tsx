"use client";
import { useEffect, useState } from "react";
import ClientOnly from "./share/ClientOnly";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi, faWifi3, faXmark } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

export default function BrowserStatus() {
  return (
    <ClientOnly>
      <BrowserStatusClient />
    </ClientOnly>
  );
}

export function BrowserStatusClient() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="p-2  text-sm flex flex-row justify-end pointer-events-auto select-none">
      <div className={clsx(["flex items-center justify-center gap-2", online ? "text-green-500" : "text-red-500"])}>
        <FontAwesomeIcon className="animate-pulse" icon={online ? faWifi : faXmark} />
        <span>{online ? "Online" : "Offline"}</span>
      </div>
    </div>
  );
}
