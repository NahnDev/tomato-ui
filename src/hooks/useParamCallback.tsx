import { useParams, useSearchParams } from "next/navigation";
import { useMemo, useEffect } from "react";

export default function useParamCallback(key: string, callback: (query: string) => void) {
  const params = useParams();
  const query = useMemo(() => params[key] as string, [params, key]);
  useEffect(() => callback(query), [query]);
}
