"use client";

import { useState } from "react";
import { ExternalLinkIcon, Menu, X } from "lucide-react";
import OndaDuraIcon from "../Icon/OndaDuraIcon/OndeDuraIcon";
import Heading from "../ui/Heading/Heading";
import { Separator } from "../ui/Separator/Separator";
import Text from "../ui/Text/Text";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 right-4 z-9999 p-2 bg-transparent transition-all active:scale-95 duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ondadura-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent flex items-center justify-center border-2 ${!isOpen ? "border-white text-white hover:bg-neutral-600" : "hover:bg-neutral-200 border-black text-black"}`}
        aria-label={isOpen ? "Fechar cabeçalho" : "Abrir cabeçalho"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <header
        className={`w-full bg-white z-999 shadow-sm transition-all duration-300 ease-in-out ${
          isOpen
            ? "fixed top-0 left-0 right-0 translate-y-0 opacity-100 pointer-events-auto"
            : "fixed top-0 left-0 right-0 -translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="container mx-auto flex flex-row gap-4 items-center justify-between p-4 pr-16 lg:pr-4">
          <div className="flex flex-row gap-4 items-center">
            <OndaDuraIcon />
            <Separator orientation="vertical" />
            <Heading
              as="h1"
              className="text-lg lg:text-2xl font-semibold select-none"
            >
              Portal da Transparência
            </Heading>
          </div>

          <div className="flex flex-row gap-4 items-center">
            <Text
              as="a"
              href="https://www.ondadura.com.br/"
              target="__blank"
              className="inline-flex gap-1 text-lg items-center lg:text-xl underline font-semibold hover:text-neutral-600 transition-colors w-fit"
              onClick={() => setIsOpen(false)}
            >
              Conheça Quem Somos
              <ExternalLinkIcon className="text-black" size={16} />
            </Text>
          </div>
        </div>
      </header>
    </>
  );
}
