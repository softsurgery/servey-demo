import { create } from "zustand";

type CategoryManager = {
  id?: number;
  name?: string;
  description?: string;
  set: (name: keyof CategoryManager, value: string | number | undefined) => void;
};

const initialValues: Omit<CategoryManager, "set"> = {
  id: undefined,
  name: "",
  description: "",
};

export const useCategoryManager = create<CategoryManager>()((set) => ({
  ...initialValues,
  set: (name, value) => set((state) => ({ ...state, [name]: value })),
}));
