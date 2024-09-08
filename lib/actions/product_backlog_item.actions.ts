"use server"

import { CreateProductBacklogItemProps } from "@/types";
import { connectToDatabase } from "../database"
import ProductBacklogItem, { IProductBacklogItem } from "../database/models/product_backlog_item.model";
import Tag from "../database/models/tag.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import mongoose from "mongoose";

/** Gets all the product backlog items */
export const getAllProductBacklogItems = async () => {
  console.log("Fetching product backlog items");
  try {
    await connectToDatabase();

    const productBacklogItems = await ProductBacklogItem
                                  .find()
                                  .populate({ path: "assignee", model: User, select: "_id name isAdmin" })
                                  .populate({ path: "tags", model: Tag, select: "_id name" });

    return JSON.parse(JSON.stringify(productBacklogItems));
  } catch (error) {
    console.error("Error fetching product backlog items:", error)
    handleError(error);
  }
}

export const createProductBacklogItem = async ({ productBacklogItem, tags, userId }: CreateProductBacklogItemProps) => {
  console.log("Creating product backlog item");
  try {
    await connectToDatabase();

    // Get assignee, throw error if not found
    const assignee = await User.findById(userId);
    if (!assignee) throw new Error("Assignee not found");

    const tagObjectIds = tags.map(tag => new mongoose.Types.ObjectId(tag));

    // TODO: tags
    const newProductBacklogItem = await ProductBacklogItem.create({
      ...productBacklogItem,
      assignee: assignee._id,
      tags: tagObjectIds
    });


    return JSON.parse(JSON.stringify(newProductBacklogItem));
  } catch (error) {
    console.error("Error creating product backlog item:", error)
    handleError(error);
  }
}
