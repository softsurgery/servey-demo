import { Category } from "@/api/types";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal, Settings2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface CategoryRowProps {
  category: Category;
  openDeleteDialog: () => void;
  prepareUpdateForm: () => void;
}

export const CategoryRow: React.FC<CategoryRowProps> = ({
  category,
  openDeleteDialog,
  prepareUpdateForm,
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{category.name}</TableCell>
      <TableCell>{category.description}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="flex items-center"
              onClick={prepareUpdateForm}
            >
              <Settings2 className="h-5 w-5 mr-2" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center "
              onClick={openDeleteDialog}
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
