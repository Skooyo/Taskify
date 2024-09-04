import { model, models, Schema } from "mongoose";

export interface IUser { 
  _id: string;
  name: string;
  isAdmin: boolean;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

const User = models.User || model<IUser>("User", UserSchema);

export default User;
