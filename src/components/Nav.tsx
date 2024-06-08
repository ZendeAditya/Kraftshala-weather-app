"use client";
import React from "react";
import { ModeToggle } from "./Theme";
const Nav = () => {

  return (
    <nav className="border-2 py-5 border-dotted flex items-center justify-between px-10 sticky">
      <div>
        <h2 className="text-xl lg:text-2xl">WeatherWise</h2>
      </div>
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Nav;
