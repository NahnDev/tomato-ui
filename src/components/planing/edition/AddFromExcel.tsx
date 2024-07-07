import ResourcePicker from "@/components/resource/ResourcePicker";
import { TResourceItem } from "@/components/resource/seed";
import { useRef, useState } from "react";

export default function AddFromCSV(props: { onCancel: () => any }) {
  const [resource, setResource] = useState<TResourceItem>();
  if (!resource) return <ResourcePicker onSubmit={setResource} onClose={props.onCancel} />;
  return <div className="flex flex-col gap-2 p-2"></div>;
}
