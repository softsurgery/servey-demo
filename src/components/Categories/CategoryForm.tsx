import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { cn } from "@/utils/cn";
import { CreateCategoryDto } from "@/api";

interface CategoryFormProps {
  className?: string;
  handleSubmit: (dto: CreateCategoryDto) => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  className,
  handleSubmit,
}) => {
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const handleReset = () => {
    setName("");
    setDescription("");
  };

  return (
    <div className={cn("px-5 mt-5", className)}>
      <div className="mt-2">
        <Label className="mb-1">Name</Label>
        <Input
          className="mt-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <Label className="mb-1">Description</Label>
        <Textarea
          className="mt-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex mt-5 gap-2">
        <Button onClick={() => handleSubmit({ name, description })}>
          Save Category
        </Button>
        <Button variant="secondary" onClick={handleReset}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
