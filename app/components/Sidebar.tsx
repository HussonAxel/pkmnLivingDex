import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "~/components/ui/sidebar";
import { Home, BookOpen, Settings, LogOut, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useSuspenseQuery } from "@tanstack/react-query";
import { pokemonQueryGenerationsDetailsOptions } from "~/utils/pokemonList";
import type { GenerationsRoot } from "~/utils/types/pokemonList.types";

type GenerationData = GenerationsRoot & { displayName: string };

export function SidebarDemo() {
  const generationsQuery = useSuspenseQuery(
    pokemonQueryGenerationsDetailsOptions()
  );

  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <Home className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Pokédex",
      href: "/pokedex/0",
      icon: (
        <BookOpen className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      sublinks: [
        ...generationsQuery.data
          .filter(
            (gen): gen is GenerationData =>
              "id" in gen &&
              "main_region" in gen &&
              "displayName" in gen &&
              !("error" in gen)
          )
          .map((generation) => ({
            label: `Generation ${generation.id} - ${generation.main_region.name}`,
            href: `/pokedex/${generation.id}`,
          })),
        {
          label: "Toutes générations",
          href: "/pokedex/0",
        },
      ],
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/logout",
      icon: (
        <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  return (
    <div className="h-full">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "User Name",
                href: "/profile",
                icon: (
                  <img
                    src="https://placehold.co/40x40"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Pokémon Living Dex
      </motion.span>
    </Link>
  );
};
