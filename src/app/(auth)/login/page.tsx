"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEnvelope,
  faEye,
  faInfoCircle,
  faLock,
  faMailBulk,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth, useIsAuthenticated } from "@/state/auth/hook";
import { TUserCredentials } from "@/types/TUser";
import { useRouter } from "next/navigation";
import { PASSWORD_REGEX } from "@/constants/regexp";
import Page from "@/components/Page";

export default function LoginPage() {
  const router = useRouter();
  const [shown, setShown] = useState(false);
  const { login, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (credentials: TUserCredentials) => {
    login(credentials);
  };

  return (
    <Page className="flex items-center justify-center h-full bg-gray-50">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit as any)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="py-8">
            <h4 className="text-slate-900 text-2xl">Join with us:</h4>
          </div>
          <div className="mb-4">
            <Input
              type="email"
              label="Email"
              icon={<FontAwesomeIcon icon={faEnvelope} />}
              {...register("mail", { required: true })}
            />
            {errors.email && (
              <div className="text-xs text-red-500 p-2 flex flex-row gap-2">
                <FontAwesomeIcon icon={faInfoCircle} />
                <span>This field is required</span>
              </div>
            )}
          </div>
          <div className="mb-6">
            <Input
              type={shown ? "text" : "password"}
              label="Password"
              icon={<FontAwesomeIcon icon={shown ? faLock : faEye} onClick={() => setShown(!shown)} />}
              {...register("password", {
                required: true,
                pattern: PASSWORD_REGEX,
              })}
            />
            {errors.password && (
              <div className="text-xs text-red-500 p-2 flex flex-row gap-2">
                <FontAwesomeIcon icon={faInfoCircle} />
                {errors.password.type === "required" && <span>This field is required</span>}
                {errors.password.type === "pattern" && <span>Password too week</span>}
              </div>
            )}
          </div>
          <div className="flex items-center justify-start">
            <Button type="submit">Login</Button>
            {error && (
              <div className="p-2 text-red-500 flex flex-row text-xs items-center gap-2">
                <FontAwesomeIcon icon={faXmarkCircle}></FontAwesomeIcon>
                <span>{error?.message}</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </Page>
  );
}
