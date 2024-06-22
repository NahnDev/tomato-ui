"use client";

import * as React from "react";
import PlaningCard from "./PlaningCard";
import PlaningHeader from "./PlaningHeader";
import PlaningStories from "./PlaningStories";
import PlaningStory from "./PlaningStory";
import PlaningAdaptor from "./PlaningAdaptor";
import Container from "../share/Container";

export default function PlaningBoard() {
  return (
    <PlaningAdaptor>
      <Container className="grid grid-rows-[auto_1fr]">
        <PlaningHeader />
        <PlaningStory />
        <PlaningStories />
      </Container>
    </PlaningAdaptor>
  );
}
