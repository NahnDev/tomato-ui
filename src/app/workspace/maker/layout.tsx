import React, { PropsWithChildren } from "react";

export default function MakerLayout(props: Readonly<PropsWithChildren<{}>>) {
  return <div className="fluid">{props.children}</div>;
}
