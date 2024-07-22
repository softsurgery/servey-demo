import React from "react";
import { CircleUser, Menu, Package2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/utils/cn";
import { Button } from "../ui/button";
import { ResponsiveSidebar } from "./ResponsiveSidebar";
import { MenuItem } from "./MenuItems";
import { ModeToggle } from "../Common";
interface HeaderProps {
  className?: string;
  menuItems?: MenuItem[];
}

export const Header: React.FC<HeaderProps> = ({ className, menuItems }) => {
  const pathname = window.location.pathname;
  return (
    <header
      className={cn(
        "sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6",
        className
      )}
    >
      <ResponsiveSidebar menuItems={menuItems} pathname={pathname} />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <a
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </a>
            {menuItems?.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "text-muted-foreground hover:text-foreground",
                  pathname === item.href && "text-foreground"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
      <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
