import { cn } from "@/utils/cn";
import React from "react";

interface CategoriesHomeProps {
  className?: string;
}

export const CategoriesHome: React.FC<CategoriesHomeProps> = ({
  className,
}) => {
  return (
    <div className={cn(className)}>
      <h1>Categories</h1>
    </div>
  );
};
