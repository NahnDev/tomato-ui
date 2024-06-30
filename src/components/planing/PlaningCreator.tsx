"use client";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { usePlaningCreateHandler } from "./store/planing";

export default function PlaningCreator() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm();

  const handleCreate = usePlaningCreateHandler((planing) => router.push(`/planing/${planing._id}`));
  return (
    <div className="fluid flex items-center justify-center">
      <div className="w-[40em] p-8 rounded-lg bg-white ">
        <form onSubmit={handleSubmit(handleCreate as any)}>
          <h6 className="text-xl text-slate-900 pb-8">Create your planing</h6>
          <div className="flex flex-row gap-2">
            <div className="flex-[2]">
              <Input
                label="Name of planing/room *"
                labelProps={{ className: formState.errors.name && "!text-red-500" }}
                {...register("title", { required: true })}
              ></Input>
            </div>
            <Button
              className="flex-1 flex flex-row gap-2 items-center justify-center"
              type="submit"
              disabled={!formState.isValid}
              color="red"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span className=" text-nowrap">Create now!</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
