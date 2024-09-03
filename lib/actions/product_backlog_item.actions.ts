"use server"

import { connectToDatabase } from "../database"
import { handleError } from "../utils";

/** Gets all the product backlog items */
export const getAllProductBacklogItems = async () => {
  try {
    await connectToDatabase();

    return "success";
  } catch (error) {
    console.log("in error")
    handleError(error);
  }
}
