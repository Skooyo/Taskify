"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Circle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const ThemeToggler = () => {
  const [theme, setTheme] = useState<string>("default");
  const changeTheme = (theme: string) => {
    setTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="bg-button rounded-lg drop-shadow-xl p-2 border-solid bg-yellow text-base font-semibold px-3 flex items-center justify-center gap-2">
            <p>Change Theme</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-3 pr-10 bg-white rounded-lg">
          <h1 className="font-semibold mb-2">Pick a Theme</h1>
          <RadioGroup
            value={theme}
            onValueChange={changeTheme}
            defaultValue="default"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Deadpool</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nature" id="r2" />
              <Label htmlFor="r2">Nature</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ocean" id="r3" />
              <Label htmlFor="r3">Ocean</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="otherdefault" id="r4" />
              <Label htmlFor="r4">Default</Label>
            </div>
          </RadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ThemeToggler;
