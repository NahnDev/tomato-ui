"use client";

import React, { useState } from "react";
import { useAuth, useIsAuthenticated } from "@/state/auth/hook";
import { Alert, Button, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBug,
  faEnvelope,
  faEye,
  faEyeSlash,
  faInfoCircle,
  faLock,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { TRegisterDto } from "@/types/TUser";
import { PASSWORD_REGEX } from "@/constants/regexp";
import { useRouter } from "next/navigation";
import Page from "@/components/Page";

const RegisterPage = () => {
  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState(false);
  const { error, register: handleRegister } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (payload: TRegisterDto) => {
    handleRegister(payload);
  };

  return (
    <Page className="flex items-center justify-center h-full bg-gray-50">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit as any)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="py-8">
            <h4 className="text-slate-900 text-2xl">Create your account:</h4>
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Display name"
              icon={<FontAwesomeIcon icon={faEnvelope} />}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <div className="text-xs text-red-500 p-2 flex flex-row gap-2">
                <FontAwesomeIcon icon={faInfoCircle} />
                <span>This field is required</span>
              </div>
            )}
          </div>
          <div className="mb-4">
            <Input
              type="mail"
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
              type={passwordShown ? "text" : "password"}
              label="Password"
              icon={
                <FontAwesomeIcon
                  icon={passwordShown ? faEye : faLock}
                  onClick={() => setPasswordShown(!passwordShown)}
                />
              }
              {...register("password", { required: true, pattern: PASSWORD_REGEX })}
            />
            {errors.password && (
              <div className="text-xs text-red-500 p-2 flex flex-row gap-2">
                <FontAwesomeIcon icon={faInfoCircle} />
                {errors.password.type === "required" && <span>This field is required</span>}
                {errors.password.type === "pattern" && <span>Password too week</span>}
              </div>
            )}
          </div>
          <div className="mb-6">
            <Input
              type={passwordShown ? "text" : "password"}
              label="Confirm Password"
              icon={
                <FontAwesomeIcon
                  icon={passwordShown ? faEye : faLock}
                  onClick={() => setPasswordShown(!passwordShown)}
                />
              }
              {...register("confirmPassword", {
                required: true,
                pattern: PASSWORD_REGEX,
                validate: (value) => value === watch("password" as any),
              })}
            />
            {errors.confirmPassword && (
              <div className="text-xs text-red-500 p-2 flex flex-row gap-2">
                <FontAwesomeIcon icon={faInfoCircle} />
                <span>Password incorrect</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-start">
            <Button type="submit">Register</Button>
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
};

export default RegisterPage;
