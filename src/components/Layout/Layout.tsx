import React from "react";
import { cn } from "@/utils/cn";
import { Header } from "./Header";
import { menuItems } from "./MenuItems";

interface LayoutProps {
  children?: React.ReactElement;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("flex min-h-screen w-full flex-col", className)}>
      <Header menuItems={menuItems} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
};
