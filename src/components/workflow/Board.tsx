"use client";

import React from "react";
import Builder from "../share/builder/Builder";
import TemplateStepper from "../template/TemplateStepper";

export default function Board() {
  return (
    <div className="fluid text-black grid grid-cols-auto-1fr">
      <TemplateStepper />
      <Builder />
    </div>
  );
}
