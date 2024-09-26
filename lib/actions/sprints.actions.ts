"use server";

import { CreateSprintParams } from "@/types";
import { connectToDatabase } from "../database";
import Sprint, { ISprint } from "../database/models/sprint.model";
import { handleError } from "../utils";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export const getAllSprints = async () => {
    try {
        await connectToDatabase();

        const sprints = await Sprint.find();

        return JSON.parse(JSON.stringify(sprints));
    } catch (error) {
        console.error("Error fetching sprints:", error);
        handleError(error);
    }
}

export const createSprint = async ({
    sprint,
}: CreateSprintParams) => {
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
}