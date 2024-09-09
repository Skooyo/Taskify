"use server";

import { CreateProductBacklogItemProps } from "@/types";
import { connectToDatabase } from "../database";
import ProductBacklogItem, {
  IProductBacklogItem,
} from "../database/models/product_backlog_item.model";
import Tag from "../database/models/tag.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import mongoose from "mongoose";
import { getTagById } from "./tag.actions";

/** Gets all the product backlog items */
export const getAllProductBacklogItems = async () => {
  try {
    await connectToDatabase();

    const productBacklogItems = await ProductBacklogItem.find()
      .populate({ path: "assignee", model: User, select: "_id name isAdmin" })
      .populate({ path: "tags", model: Tag, select: "_id name" });

    return JSON.parse(JSON.stringify(productBacklogItems));
  } catch (error) {
    console.error("Error fetching product backlog items:", error);
    handleError(error);
  }
};

export const createProductBacklogItem = async ({
  productBacklogItem,
  tags,
  userId,
}: CreateProductBacklogItemProps) => {
  try {
    await connectToDatabase();

    const newProductBacklogItem = await ProductBacklogItem.create({
      ...productBacklogItem,
      assignee: userId,
      tags,
    });

    return JSON.parse(JSON.stringify(newProductBacklogItem));
  } catch (error) {
    console.error("Error creating product backlog item:", error);
    handleError(error);
  }
};
