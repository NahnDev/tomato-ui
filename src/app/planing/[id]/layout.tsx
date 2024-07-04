import PageLoading from "@/components/share/PageLoading";
import { PropsWithChildren, Suspense } from "react";

export default function ThePlaningLayout(props: PropsWithChildren<{}>) {
  return <Suspense fallback={<PageLoading />}>{props.children}</Suspense>;
}
