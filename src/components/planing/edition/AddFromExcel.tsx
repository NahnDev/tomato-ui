import ResourcePicker from "@/components/ResourcePicker";
import { useRef, useState } from "react";

export default function AddFromExcel() {
  const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState(null as File | null);

  return <ResourcePicker />;
}
