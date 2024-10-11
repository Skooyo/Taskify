import { model, models, Schema } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  password: string;
  hoursLogged: number[];
  workDescriptions: string[];
  dateOfWork: Date[];
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    hoursLogged: {
      type: [Number],
      required: true,
    },
    workDescriptions: {
      type: [String],
      required: true,
    },
    dateOfWork: {
      type: [Date],
      required: true,
    }
  },
  { collection: "users" },
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;
