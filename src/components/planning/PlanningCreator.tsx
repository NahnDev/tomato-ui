"use client";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { usePlanningCreateHandler } from "./store/planning";
import useAsyncFn from "react-use/lib/useAsyncFn";
import StateButton from "../share/button/StateButton";
import WaterWave from "../share/WaterWave";
import Image from "next/image";
import bg from "@/assets/meeting.jpg";
import { url } from "inspector";

export default function PlanningCreator() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm();
  const handleCreate = usePlanningCreateHandler((planning) => router.push(`/planning/${planning._id}`));
  const [{ loading }, handle] = useAsyncFn(handleCreate);

  return (
    <div className="fluid max-w-[70%] p-2">
      <div className="fluid  flex flex-col items-center justify-center rounded-lg bg-white p-2 relative z-0">
        <form onSubmit={handleSubmit(handle as any)} className="flex flex-col items-center gap-10">
          <div className=" px-10 hover:scale-105 duration-1000">
            <h6 className="text-[6em] text-red-500 font-bold ">Create your planning</h6>
          </div>
          <div className="flex flex-row gap-2 w-[30em] hover:scale-105 duration-1000 text-xl">
            <div className="flex-[2]">
              <Input
                label="Name of planning/room *"
                labelProps={{ className: formState.errors.name && "!text-red-500" }}
                {...register("title", { required: true })}
              ></Input>
            </div>
            <StateButton
              loading={loading}
              icon={faPlus}
              label="Create now!"
              className="flex-1 flex flex-row gap-2 items-center justify-center"
              type="submit"
              disabled={!formState.isValid}
              color="red"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
