"use server"

import { connectToDatabase } from "../database"
import ProductBacklogItem from "../database/models/product_backlog_item.model";
import Tag from "../database/models/tag.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";

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
