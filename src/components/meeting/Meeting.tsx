"use client";

import { useParams, useSearchParams } from "next/navigation";
import ClientOnly from "../share/ClientOnly";
import MeetingBoard from "./MeetingBoard";
import MeetingProvider from "./MeetingProvider";
import useParamCallback from "@/hooks/useParamCallback";

export default function Meeting() {
  return (
    <ClientOnly>
      <MeetingProvider>
        <MeetingBoard />
      </MeetingProvider>
    </ClientOnly>
  );
}
