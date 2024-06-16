"use client";

import * as React from "react";
import PlaningCard from "./PlaningCard";
import PlaningHeader from "./PlaningHeader";
import PlaningStories from "./PlaningStories";
import PlaningStory from "./PlaningStory";

export default function PlaningBoard() {
  return (
    <div className="grid grid-rows-[auto_1fr]">
      <PlaningHeader />
      <div className="w-[80vw] mx-auto grid grid-cols-[1fr_auto] justify-center">
        <PlaningStory />
      </div>
      <PlaningStories />
    </div>
  );
}
