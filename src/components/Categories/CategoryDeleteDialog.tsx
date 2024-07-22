import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface CategoryDeleteDialogProps {
  isOpen?: boolean;
  label?: string;
  handleDelete: () => void;
  onClose?: () => void;
}

export const CategoryDeleteDialog: React.FC<CategoryDeleteDialogProps> = ({
  isOpen = false,
  label,
  handleDelete = () => {},
  onClose = () => {},
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="pt-8 px-10 text-center">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete The category with name{" "}
            <span className="font-bold">{label}</span>{" "}?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            category and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <Button onClick={handleDelete}>Yes, Please</Button>
          <Button variant="secondary" onClick={onClose}>
            No, cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
