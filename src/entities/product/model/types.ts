import type { Category } from "@/entities/category/model/types";

export interface DeviceJson {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  description: string;
}

export interface Product extends Omit<DeviceJson, "category"> {
  category: Category;
}
