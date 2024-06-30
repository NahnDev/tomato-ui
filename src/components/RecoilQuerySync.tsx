/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSearchParams } from "next/navigation";
import { PropsWithChildren, useMemo, useEffect } from "react";
import { useSetRecoilState } from "recoil";

type TRecoilQuerySyncProps = Readonly<
  PropsWithChildren<{
    query: string;
    selector: any;
  }>
>;

export default function RecoilQuerySync(props: TRecoilQuerySyncProps) {
  const handleLoader = useSetRecoilState(props.selector);
  const searchParams = useSearchParams();

  const query = useMemo(() => searchParams.get(props.query), [searchParams, props.query]);
  useEffect(() => handleLoader(query), [query]);
  return <>{props.children}</>;
}
