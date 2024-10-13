"use server";

import { CreateSprintParams, UpdateSprintTasksParams } from "@/types";
import { connectToDatabase } from "../database";
import Sprint, { ISprint } from "../database/models/sprint.model";
import { handleError } from "../utils";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import ProductBacklogItem, {
  IProductBacklogItem,
} from "../database/models/product_backlog_item.model";
import User from "../database/models/user.model";
import Tag from "../database/models/tag.model";
import {
  getProductBacklogItemById,
  updateProductBacklogItemStatusAndCompleted,
} from "./product_backlog_item.actions";

export const getAllSprints = async () => {
  try {
    await connectToDatabase();

    const sprints = await Sprint.find().populate([
      {
        path: "notStartedTasks",
        model: ProductBacklogItem,
        select:
          "_id title description priority storyPoints status developmentPhase totalLoggedHours loggedHours taskType createdAt dateCompleted assignee tags",
        populate: [
          { path: "assignee", model: User, select: "_id name isAdmin" },
          { path: "tags", model: Tag, select: "_id name" },
        ],
      },
      {
        path: "inProgressTasks",
        model: ProductBacklogItem,
        select:
          "_id title description priority storyPoints status developmentPhase totalLoggedHours loggedHours taskType createdAt dateCompleted assignee tags",
        populate: [
          { path: "assignee", model: User, select: "_id name isAdmin" },
          { path: "tags", model: Tag, select: "_id name" },
        ],
      },
      {
        path: "completedTasks",
        model: ProductBacklogItem,
        select:
          "_id title description priority storyPoints status developmentPhase totalLoggedHours loggedHours taskType createdAt dateCompleted assignee tags",
        populate: [
          { path: "assignee", model: User, select: "_id name isAdmin" },
          { path: "tags", model: Tag, select: "_id name" },
        ],
      },
    ]);

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

    const sprint = await Sprint.findById(id).populate([
      {
        path: "notStartedTasks",
        model: ProductBacklogItem,
        select:
          "_id title description priority storyPoints status developmentPhase totalLoggedHours loggedHours taskType createdAt assignee tags",
        populate: [
          { path: "assignee", model: User, select: "_id name isAdmin" },
          { path: "tags", model: Tag, select: "_id name" },
        ],
      },
      {
        path: "inProgressTasks",
        model: ProductBacklogItem,
        select:
          "_id title description priority storyPoints status developmentPhase totalLoggedHours loggedHours taskType createdAt assignee tags",
        populate: [
          { path: "assignee", model: User, select: "_id name isAdmin" },
          { path: "tags", model: Tag, select: "_id name" },
        ],
      },
      {
        path: "completedTasks",
        model: ProductBacklogItem,
        select:
          "_id title description priority storyPoints status developmentPhase totalLoggedHours loggedHours taskType createdAt assignee tags",
        populate: [
          { path: "assignee", model: User, select: "_id name isAdmin" },
          { path: "tags", model: Tag, select: "_id name" },
        ],
      },
    ]);

    return JSON.parse(JSON.stringify(sprint));
  } catch (error) {
    console.error("Error fetching sprint by ID:", error);
    handleError(error);
  }
};

export const updateSprintTasks = async ({
  sprint,
  notStarted,
  inProgress,
  completed,
}: UpdateSprintTasksParams) => {
  try {
    await connectToDatabase();

    const updatedSprint = await Sprint.findByIdAndUpdate(
      sprint?._id,
      {
        ...sprint,
        notStartedTasks: notStarted,
        inProgressTasks: inProgress,
        completedTasks: completed,
      },
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

    const populatedSprint = await getSprintById(sprint._id);
    const totalStoryPoints = populatedSprint.notStartedTasks.reduce(
      (acc: number, task: IProductBacklogItem) => acc + (task.storyPoints || 0),
      0,
    );

    const updatedSprint = await Sprint.findByIdAndUpdate(
      sprint._id,
      {
        status: "Active",
        startDate: new Date(),
        totalStoryPoints: totalStoryPoints,
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

    const _ = await Sprint.findByIdAndUpdate(
      sprint._id,
      {
        status: "Completed",
        endDate: new Date(),
      },
      { new: true },
    );

    const populatedSprint = await getSprintById(sprint._id);

    await Promise.all(
      populatedSprint.inProgressTasks.map((task: IProductBacklogItem) =>
        updateProductBacklogItemStatusAndCompleted({
          productBacklogItem: task,
          status: "Not Started",
        }),
      ),
    );

    const newSprint = await updateSprintTasks({
      sprint: populatedSprint,
      notStarted: [],
      inProgress: [],
      completed: populatedSprint.completedTasks,
    });

    const tasks = await Promise.all(
      sprint.inProgressTasks.map((task) => {
        console.log("task in stopSprint", task);
        return getProductBacklogItemById(task._id);
      }),
    );

    // console.log("newSprint", updatedSprint);
    console.log("newSprint", newSprint);
    // if (updatedSprint) revalidatePath("/sprints");
    if (newSprint) revalidatePath("/sprints");
    // return JSON.parse(JSON.stringify(updatedSprint));
    return JSON.parse(JSON.stringify(newSprint));
  } catch (error) {
    console.error("Error stopping sprint:", error);
    handleError(error);
  }
};

export const updateSprint = async ({ sprint }: { sprint: ISprint }) => {
  try {
    await connectToDatabase();

    const updatedSprint = await Sprint.findByIdAndUpdate(
      sprint._id,
      { ...sprint },
      { new: true },
    );

    if (updatedSprint) revalidatePath("/sprints");
    return JSON.parse(JSON.stringify(updatedSprint));
  } catch (error) {
    console.error("Error updating sprint:", error);
    handleError(error);
  }
};
