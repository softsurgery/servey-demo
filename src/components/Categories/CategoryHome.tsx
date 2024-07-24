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
import { api, Category, CreateCategoryDto, UpdateCategoryDto } from "@/api";
import Spinner from "../Common/Spinner";
import { CategoryRow } from "./CategoryRow";
import { CategoryDeleteDialog } from "./CategoryDeleteDialog";
import { CategoryForm } from "./CategoryForm";
import { useToast } from "../ui/use-toast";
import { useCategoryManager } from "@/hooks/functions/useCategoryManager";
import { Input } from "../ui/input";

interface CategoriesHomeProps {
  className?: string;
}

export const CategoriesHome: React.FC<CategoriesHomeProps> = ({
  className,
}) => {
  const { toast } = useToast();
  const categoryManager = useCategoryManager();

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

  const { mutate: updateCategory, isPending: isUpdatePending } = useMutation({
    mutationFn: (updateCategoryDto: UpdateCategoryDto) =>
      api.category.update(updateCategoryDto),
    onSuccess: () => {
      refetchCategories();
      toast({
        title: "You are good",
        description: "Category updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: "Error updating category:" + error.message,
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

  const handleReset = () => {
    categoryManager.set("id", undefined);
    categoryManager.set("name", "");
    categoryManager.set("description", "");
  };

  const handleSubmit = () => {
    const dto = {
      name: categoryManager?.name || "",
      description: categoryManager?.description || "",
    };
    if (categoryManager.id) updateCategory({ ...dto, id: categoryManager?.id });
    else createCategory(dto);
    handleReset();
  };

  const prepareUpdateForm = (category: Category) => {
    categoryManager.set("id", category?.id);
    categoryManager.set("name", category?.name);
    categoryManager.set("description", category?.description);
  };

  const handleDeleteCategory = () => {
    deleteCategory(selectedCategory?.id);
    setSelectedCatgeory(null);
  };

  const loading =
    isFetchingPending || isCreatePending || isUpdatePending || isDeletePending;
  if (loading) return <Spinner />;
  return (
    <div className={cn("flex flex-col gap-4 w-full p-10", className)}>
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
          <CategoryForm handleSubmit={handleSubmit} handleReset={handleReset} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <div className="my-2">
            <Input/>
          </div>
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
                    prepareUpdateForm={() => {
                      prepareUpdateForm(category);
                    }}
                  />
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
