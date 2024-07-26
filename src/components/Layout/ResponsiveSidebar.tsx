import { cn } from "@/utils/cn";
import { Package2 } from "lucide-react";
import React from "react";
import { MenuItem } from "./MenuItems";
import { Link } from "react-router-dom";

interface ResponsiveSidebarProps {
  className?: string;
  menuItems?: MenuItem[];
  pathname?: string;
}

export const ResponsiveSidebar: React.FC<ResponsiveSidebarProps> = ({
  className,
  menuItems,
  pathname
}) => {


  return (
    <nav
      className={cn(
        "hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6",
        className
      )}
    >
      <Link
        to="#"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2 className="h-6 w-6" />
        <span className="sr-only">Servey</span>
      </Link>
      {menuItems?.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          className={cn(
            "text-muted-foreground hover:text-foreground",
            pathname === item.href && "text-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
