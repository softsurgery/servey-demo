import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { cn } from "@/utils/cn";
import { useCategoryManager } from "@/hooks/functions/useCategoryManager";

interface CategoryFormProps {
  className?: string;
  handleSubmit: () => void;
  handleReset: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  className,
  handleSubmit,
  handleReset
}) => {
  const categoryManager = useCategoryManager();

  return (
    <div className={cn("px-5 mt-5", className)}>
      <div className="mt-2">
        <Label className="mb-1">Name</Label>
        <Input
          className="mt-1"
          value={categoryManager.name}
          onChange={(e) => categoryManager.set("name", e.target.value)}
        />
      </div>
      <div className="mt-2">
        <Label className="mb-1">Description</Label>
        <Textarea
          className="mt-1"
          value={categoryManager.description}
          onChange={(e) => categoryManager.set("description", e.target.value)}
        />
      </div>
      <div className="flex mt-5 gap-2">
        <Button onClick={handleSubmit}>Save Category</Button>
        <Button variant="secondary" onClick={handleReset}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
