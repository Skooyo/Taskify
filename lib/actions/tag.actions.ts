"use server";

import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Tag from "../database/models/tag.model";
import { CreateTagParams } from "@/types";

export const createTag = async ({ name: tagName }: CreateTagParams) => {
  try {
    await connectToDatabase();

    const newTag = await Tag.create({ name: tagName });

    return JSON.parse(JSON.stringify(newTag));
  } catch (error) {
    handleError(error);
  }
};

export const getAllTags = async () => {
  try {
    await connectToDatabase();

    const categories = await Tag.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};

export const getTagById = async (tagId: string) => {
  try {
    await connectToDatabase();

    const tag = await Tag.findById(tagId);
    if (!tag) throw new Error("Tag not found");

    return JSON.parse(JSON.stringify(tag));
  } catch (error) {
    console.error(error);
    handleError(error);
  }
};
