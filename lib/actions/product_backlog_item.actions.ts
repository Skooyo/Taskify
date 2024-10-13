"use server";

import {
  CreateProductBacklogItemProps,
  DeleteProductBacklogItemByIdParams,
  UpdateProductBacklogHoursParams,
  UpdateProductBacklogItemParams,
  UpdateProductBacklogItemStatusParams,
} from "@/types";
import { connectToDatabase } from "../database";
import ProductBacklogItem, {
  IProductBacklogItem,
} from "../database/models/product_backlog_item.model";
import Tag from "../database/models/tag.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import mongoose from "mongoose";
import { getTagById } from "./tag.actions";
import { revalidatePath } from "next/cache";

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

export const getProductBacklogItemById = async (
  productBacklogItemId: string,
) => {
  try {
    await connectToDatabase();

    const productBacklogItem = await ProductBacklogItem.findById(
      productBacklogItemId,
    )
      .populate({ path: "assignee", model: User, select: "_id name isAdmin" })
      .populate({ path: "tags", model: Tag, select: "_id name" });

    return JSON.parse(JSON.stringify(productBacklogItem));
  } catch (error) {
    console.error("Error fetching product backlog item by id:", error);
    handleError(error);
  }
};

export const createProductBacklogItem = async ({
  productBacklogItem,
  tags,
  userId,
  pathname,
}: CreateProductBacklogItemProps) => {
  try {
    await connectToDatabase();

    const newProductBacklogItem = await ProductBacklogItem.create({
      ...productBacklogItem,
      assignee: userId,
      tags,
    });

    if (newProductBacklogItem) revalidatePath(pathname);
    return JSON.parse(JSON.stringify(newProductBacklogItem));
  } catch (error) {
    console.error("Error creating product backlog item:", error);
    handleError(error);
  }
};

export const deleteProductBacklogItemById = async ({
  productBacklogItemId,
  pathname,
}: DeleteProductBacklogItemByIdParams) => {
  try {
    await connectToDatabase();

    const deletedItem = await ProductBacklogItem.findByIdAndDelete(
      productBacklogItemId,
    );

    if (deletedItem) revalidatePath(pathname);
  } catch (error) {
    handleError(error);
  }
};

export const updateProductBacklogItemStatusAndCompleted = async ({
  productBacklogItem,
  status,
  dateCompleted,
}: UpdateProductBacklogItemStatusParams) => {
  try {
    await connectToDatabase();

    const updatedItem = await ProductBacklogItem.findByIdAndUpdate(
      productBacklogItem._id,
      { ...productBacklogItem, status, dateCompleted },
      { new: true },
    );

    console.log(updatedItem);
    return JSON.parse(JSON.stringify(updatedItem));
  } catch (error) {
    handleError(error);
  }
};

export const updateProductBacklogItem = async ({
  productBacklogItem,
  tags,
  userId,
  pathname,
}: UpdateProductBacklogItemParams) => {
  try {
    await connectToDatabase();

    const updatedItem = await ProductBacklogItem.findByIdAndUpdate(
      productBacklogItem._id,
      { ...productBacklogItem, tags, assignee: userId },
      { new: true },
    );

    if (updatedItem) revalidatePath(pathname);
    return JSON.parse(JSON.stringify(updatedItem));
  } catch (error) {
    handleError(error);
  }
};

export const updateProductBacklogItemHours = async ({
  productBacklogItem,
  hoursWorked,
  dateWorked,
  workDescription,
  pathname,
}: UpdateProductBacklogHoursParams) => {
  try {
    await connectToDatabase();

    const updatedItem = await ProductBacklogItem.findByIdAndUpdate(
      productBacklogItem._id,
      {
        ...productBacklogItem,
        totalLoggedHours: productBacklogItem.totalLoggedHours
          ? productBacklogItem.totalLoggedHours + hoursWorked
          : hoursWorked,
        loggedHours: productBacklogItem.loggedHours
          ? [
              ...productBacklogItem.loggedHours,
              hoursWorked,
              dateWorked,
              workDescription,
            ]
          : [hoursWorked, dateWorked, workDescription],
      },
      { new: true },
    );

    console.log("Log hours updated");

    if (updatedItem) revalidatePath(pathname);
    return JSON.parse(JSON.stringify(updatedItem));
  } catch (error) {
    handleError(error);
  }
};
