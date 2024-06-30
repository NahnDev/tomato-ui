import PageLoading from "@/components/share/PageLoading";
import { PropsWithChildren, Suspense } from "react";

export default function AuthLayout(props: PropsWithChildren<{}>) {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<PageLoading />}>{props.children}</Suspense>
    </div>
  );
}
