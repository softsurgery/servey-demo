import React from "react";
import { cn } from "@/utils/cn";
import { Header } from "./Header";
import { menuItems } from "./MenuItems";
import { Toaster } from "../ui/toaster";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-1 overflow-hidden h-screen w-full flex-col", className)}>
      <Header menuItems={menuItems} />
      <main className="flex flex-1 overflow-auto flex-col gap-4 p-4 md:gap-8 md:p-8 w-full">
        <Outlet />
      </main>
      <Toaster/>
    </div>
  );
};
