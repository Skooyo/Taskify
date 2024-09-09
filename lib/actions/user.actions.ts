"use server";

import { CreateUserParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { handleError } from "../utils";

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

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

export async function getAllUsers() {
  try {
    await connectToDatabase();

    const users = await User.find();
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
}
