"use client";

import React, { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";
import { RecoilURLSyncJSON } from "recoil-sync";

function RecoilRootWrapper({ children }: Readonly<PropsWithChildren>) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default RecoilRootWrapper;
