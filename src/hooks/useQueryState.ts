import { useSearchParams } from "next/navigation";
import React from "react";

export default function useQueryState<T>(key: string, intial: T) {
  const searchParams = useSearchParams();
  return (searchParams.get(key) as T) ?? intial;
}
