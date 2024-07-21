import { axios } from "./axios";
import { Category } from "./types";

export interface CreateCategoryDto extends Pick<Category, "name" | "description"> {}

const fetch = async (): Promise<Category[]> => {
  const response = await axios.get("api/categories");
  return response.data;
};

const create = async (createCategoryDto: CreateCategoryDto) => {
  const response = await axios.post("api/categories", createCategoryDto);
  return response.data;
};

export const category = { fetch, create };