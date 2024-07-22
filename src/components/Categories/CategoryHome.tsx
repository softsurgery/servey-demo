import { cn } from "@/utils/cn";
import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api, Category, CreateCategoryDto } from "@/api";
import Spinner from "../Common/Spinner";
import { CategoryRow } from "./CategoryRow";
import { CategoryDeleteDialog } from "./CategoryDeleteDialog";
import { CategoryForm } from "./CategoryForm";
import { useToast } from "../ui/use-toast";

interface CategoriesHomeProps {
  className?: string;
}

export const CategoriesHome: React.FC<CategoriesHomeProps> = ({
  className,
}) => {
  const { toast } = useToast();

  const [selectedCategory, setSelectedCatgeory] =
    React.useState<Category | null>(null);

  const {
    data: categories,
    isPending: isFetchingPending,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.category.fetch(),
  });

  const { mutate: createCategory, isPending: isCreatePending } = useMutation({
    mutationFn: (createCategoryDto: CreateCategoryDto) =>
      api.category.create(createCategoryDto),
    onSuccess: () => {
      refetchCategories();
      toast({
        title: "You are good",
        description: "Category added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: "Error adding category:" + error.message,
      });
    },
  });

  const { mutate: deleteCategory, isPending: isDeletePending } = useMutation({
    mutationFn: (id: number | undefined) => api.category.remove(id),
    onSuccess: () => {
      refetchCategories();
      toast({
        title: "You are good",
        description: "Category deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: "Error deleting category:" + error.message,
      });
    },
  });

  const handleDeleteCategory = () => {
    deleteCategory(selectedCategory?.id);
    setSelectedCatgeory(null);
  };

  const loading = isFetchingPending || isCreatePending || isDeletePending;
  if (loading) return <Spinner />;
  return (
    // <div className="flex flex-1 w-full overflow-auto">
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      <CategoryDeleteDialog
        isOpen={!!selectedCategory}
        label={selectedCategory?.name}
        handleDelete={handleDeleteCategory}
        onClose={() => setSelectedCatgeory(null)}
      />
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Categories List</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryForm handleSubmit={createCategory} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.map((category) => {
                return (
                  <CategoryRow
                    key={category.id}
                    category={category}
                    openDeleteDialog={() => setSelectedCatgeory(category)}
                  />
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    // </div>
  );
};
