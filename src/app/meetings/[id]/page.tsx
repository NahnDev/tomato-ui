import Meeting from "@/components/meeting/Meeting";
import { Suspense } from "react";

export default function TheMeetingPage() {
  return (
    <Suspense fallback="Loading...">
      <Meeting />
    </Suspense>
  );
}
