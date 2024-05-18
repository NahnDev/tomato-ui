"use client";
import { usePathname } from "next/navigation";

export default function useIsActiveRoute(href: string): boolean {
  const pathname = usePathname();
  return new RegExp(href, "ig").test(pathname);
}
