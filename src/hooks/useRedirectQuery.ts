import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const REDIRECT_KEY = "redirect";
export default function useRedirectSearchParams() {
  const query = useSearchParams();
  const pathname = usePathname();

  return useMemo(() => {
    const urlSearchParams = new URLSearchParams();
    if (query.get(REDIRECT_KEY)) {
      urlSearchParams.set(REDIRECT_KEY, query.get(REDIRECT_KEY) as string);
    } else {
      urlSearchParams.set(REDIRECT_KEY, pathname);
    }
    return urlSearchParams;
  }, [query, pathname]);
}
