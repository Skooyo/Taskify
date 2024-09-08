import { model, models, Schema } from "mongoose";

export interface ITag {
  _id: string;
  name: string;
}

const TagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, { collection: "tags" });

const Tag = models.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
