"use client";

import PageLoading from "@/components/share/PageLoading";
import { useAuth } from "@/state/auth/hook";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function LogoutPage() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, []);

  return <PageLoading />;
}
