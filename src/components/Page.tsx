import { PropsWithChildren, Suspense } from "react";
import PageLoading from "./share/PageLoading";
import clsx from "clsx";

export default function Page(props: PropsWithChildren<{ className?: string }>) {
  return (
    <Suspense fallback={<PageLoading />}>
      <div className={clsx([props.className])}>{props.children}</div>
    </Suspense>
  );
}
