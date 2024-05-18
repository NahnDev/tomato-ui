import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function useQueryParam<T = any>(
  key: string,
  options?: Partial<{ initial: T | undefined; transform: (value: T) => string }>
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const intialTransformFunc = (value: T) => (value?.toString ? value.toString() : "");
  const { initial = undefined, transform = intialTransformFunc } = options ?? {};
  const [value, setValue] = useState<T | undefined>(() => {
    const param = searchParams.get(key);
    return param ? (param as unknown as T) : initial;
  });

  useEffect(() => {
    const param = searchParams.get(key);
    if (param) {
      setValue(param as unknown as T);
    }
  }, [searchParams, key]);

  const setQueryValue = (newValue: T) => {
    setValue(newValue);
    const updatedQuery = new URLSearchParams(searchParams.toString());
    updatedQuery.set(key, transform(newValue));
    router.replace(`?${updatedQuery.toString()}`);
  };

  return [value, setQueryValue] as const;
}
