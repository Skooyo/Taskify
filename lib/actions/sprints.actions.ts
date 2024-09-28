"use server";

import { CreateSprintParams, UpdateSprintTasksParams } from "@/types";
import { connectToDatabase } from "../database";
import Sprint, { ISprint } from "../database/models/sprint.model";
import { handleError } from "../utils";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import ProductBacklogItem from "../database/models/product_backlog_item.model";

export const getAllSprints = async () => {
  try {
    await connectToDatabase();

    const sprints = await Sprint.find().populate({
      path: "notStartedTasks",
      model: ProductBacklogItem,
      select:
        "_id title description prioerity storyPoints status developmentPhase totalLoggedHours loggedHours taskType createdAt assignee tags",
    });

    // Logic to automatically start sprints
    sprints.forEach((sprint) => {
      if (sprint.status !== "Completed") {
        const startDate = new Date(sprint.startDate);
        const endDate = new Date(sprint.endDate);
        const now = new Date();

        if (startDate <= now && endDate >= now) {
          sprint.status = "Active";
        } else if (endDate < now) {
          sprint.status = "Completed";
        }
      }
    });

    return JSON.parse(JSON.stringify(sprints));
  } catch (error) {
    console.error("Error fetching sprints:", error);
    handleError(error);
  }
};

export const getSprintById = async (id: string) => {
  try {
    await connectToDatabase();

    const sprint = await Sprint.findById(id).populate({
      path: "notStartedTasks",
      model: ProductBacklogItem,
      select:
        "_id title description prioerity storyPoints status developmentPhase totalLoggedHours loggedHours taskType createdAt assignee tags",
    });

    return JSON.parse(JSON.stringify(sprint));
  } catch (error) {
    console.error("Error fetching sprint by ID:", error);
    handleError(error);
  }
};

export const updateSprintTasks = async ({
  sprint,
  tasks,
}: UpdateSprintTasksParams) => {
  try {
    await connectToDatabase();

    const updatedSprint = await Sprint.findByIdAndUpdate(
      sprint?._id,
      { ...sprint, notStartedTasks: tasks },
      { new: true },
    );

    return JSON.parse(JSON.stringify(updatedSprint));
  } catch (error) {
    handleError(error);
  }
};

export const createSprint = async ({ sprint }: CreateSprintParams) => {
  try {
    await connectToDatabase();

    const newSprint = await Sprint.create({
      ...sprint,
    });

    if (newSprint) revalidatePath("/sprints");
    return JSON.parse(JSON.stringify(newSprint));
  } catch (error) {
    console.error("Error creating sprint:", error);
    handleError(error);
  }
};

export const startSprint = async ({ sprint }: { sprint: ISprint }) => {
  try {
    await connectToDatabase();

    const updatedSprint = await Sprint.findByIdAndUpdate(
      sprint._id,
      {
        status: "Active",
      },
      { new: true },
    );

    if (updatedSprint) revalidatePath("/sprints");
    return JSON.parse(JSON.stringify(updatedSprint));
  } catch (error) {
    console.error("Error starting sprint:", error);
    handleError(error);
  }
};

export const deleteSprintById = async ({ sprint }: { sprint: ISprint }) => {
  try {
    await connectToDatabase();

    const deletedSprint = await Sprint.findByIdAndDelete(sprint._id);

    if (deletedSprint) revalidatePath("/sprints");
  } catch (error) {
    console.error("Error deleting sprint:", error);
    handleError(error);
  }
};

export const stopSprint = async ({ sprint }: { sprint: ISprint }) => {
  try {
    await connectToDatabase();

    const updatedSprint = await Sprint.findByIdAndUpdate(
      sprint._id,
      {
        status: "Completed",
      },
      { new: true },
    );

    if (updatedSprint) revalidatePath("/sprints");
    return JSON.parse(JSON.stringify(updatedSprint));
  } catch (error) {
    console.error("Error stopping sprint:", error);
    handleError(error);
  }
};
