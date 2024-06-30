"use client";

import { useAuth, useIsAuthenticated } from "@/state/auth/hook";
import { PropsWithChildren, useEffect } from "react";
import PageLoading from "./PageLoading";

export default function AuthRequired(props: PropsWithChildren<{}>) {
  const { isAuthenticated, redirect } = useAuth();
  useEffect(() => {
    if (isAuthenticated === false) redirect();
  }, [isAuthenticated]);

  if (!isAuthenticated) return <PageLoading />;
  return props.children;
}
