import { model, models, Schema } from "mongoose";

export interface IProductBacklogItem {
  _id: string;
  title: string;
  description: string;
  priority: string;
  storyPoints: number;
  status: string;
  developmentPhase: string;
  totalLoggedHours: string;
  loggedHours: string[];
  taskType: string;
  createdAt: Date;
  assignee: {
    _id: string;
    name: string;
  };
  tags: {
    _id: string;
    name: string;
  }[];
}

const ProductBacklogItemSchema = new Schema<IProductBacklogItem>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    storyPoints: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    developmentPhase: {
      type: String,
      required: true,
    },
    totalLoggedHours: {
      type: String,
    },
    loggedHours: {
      type: [String],
    },
    taskType: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { collection: "product_backlog_items" },
);

const ProductBacklogItem =
  models.ProductBacklogItem ||
  model<IProductBacklogItem>("ProductBacklogItem", ProductBacklogItemSchema);

export default ProductBacklogItem;
