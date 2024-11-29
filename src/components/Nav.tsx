import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Switch} from "@nextui-org/react";
import { SunIcon } from "./ui/SunIcon";
import { MoonIcon } from "./ui/MoonIcon";
import { useAtom } from "jotai";
import { ThemeAtom } from "@/utils/ThemeAtom";

export default function Nav() {
  const [theme, setTheme] = useAtom(ThemeAtom);

  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold text-3xl">TO-DO List</p>
      </NavbarBrand>
      <NavbarContent justify="end">
      <Switch
        isSelected={theme}
        onValueChange={(isSelected) => setTheme(isSelected)}
      size="lg"
      color="primary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    />
      </NavbarContent>
    </Navbar>
  );
}
