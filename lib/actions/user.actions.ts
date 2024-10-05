"use server";

import { CreateUserParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import { IUser } from "../database/models/user.model";

export const createUser = async({user}: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create({
      ...user,
    });

    revalidatePath("/admin")
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export const deleteUserById = async ({user}: { user: IUser }) => {
  try {
    await connectToDatabase();

    const deletedUser = await User.findByIdAndDelete(user._id);

    if (deletedUser) revalidatePath("/admin");
  } catch (error) {
    handleError(error);
  }
}

export async function getAllUsers() {
  try {
    await connectToDatabase();

    const users = await User.find();
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
}