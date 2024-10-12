"use server";

import { changeAdminPasswordParams, CreateUserParams, deleteUserByIdParams, logUserHoursParams, UpdateUserParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import { IUser } from "../database/models/user.model";
import { Router } from "lucide-react";

export const createUser = async ({ user }: CreateUserParams) => {
  try {
    await connectToDatabase();

    console.log(user.email)

    const newUser = await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    });

    revalidatePath("/admin");
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error)
    throw error;
  }
};

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

// TODO: implement validation to prevent deletion of users who are assigned to tasks
export const deleteUserById = async ({ _id }: deleteUserByIdParams) => {
  try {
    await connectToDatabase();

    const deletedUser = await User.findByIdAndDelete(_id);

    if (deletedUser) revalidatePath("/admin");
  } catch (error) {
    handleError(error);
  }
};

export async function getAllUsers() {
  try {
    await connectToDatabase();

    const users = await User.find();
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
}

export const updateUser = async ({user}: UpdateUserParams) => {
  try {
    await connectToDatabase();

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {...user},
      { new: true},
    );

    if (updatedUser) revalidatePath("/admin");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export async function getUserByName({ name }: { name: string }) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ name });
    console.log("got user:", user);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function verifyUser({
  name,
  password,
}: {
  name: string;
  password: string;
}) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ name });

    if (!user) return null;

    if (user.password === password) return JSON.parse(JSON.stringify(user));

    return user;
  } catch (error) {
    handleError(error);
    return false;
  }
}

export async function logUserHours({
  userName,
  workDescription,
  hoursLogged,
  dateWorked,
}: logUserHoursParams) {
  try {
    await connectToDatabase();

    const user = await getUserByName({ name: userName });

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $push: { hoursLogged: hoursLogged, workDescriptions: workDescription, dateOfWork: dateWorked },
      },
      { new: true },
    );

    if (updatedUser) revalidatePath("/admin");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function changeAdminPassword({
  newPassword
}: changeAdminPasswordParams) {
  try {

    await connectToDatabase();
    
    const user = await getUserByName({ name: "admin" });
    
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { password: newPassword },
      { new: true },
    );
    
    if (updatedUser) revalidatePath("/admin");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}
