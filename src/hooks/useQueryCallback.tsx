import { useSearchParams } from "next/navigation";
import { useMemo, useEffect } from "react";

export default function useQueryCallback(key: string, callback: (query: string) => void) {
  const searchParams = useSearchParams();
  const query = useMemo(() => searchParams.get(key) as string, [searchParams, key]);
  useEffect(() => callback(query), [query]);
}
