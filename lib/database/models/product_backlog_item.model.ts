import { model, models, Schema } from "mongoose";

export interface IProductBacklogItem {
  _id: string;
  title?: string;
  description?: string;
  priority?: string;
  storyPoints?: number;
  status?: string;
  developmentPhase?: string;
  totalLoggedHours?: string;
  loggedHours?: string[];
  taskType?: string;
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
      required: false,
      default: "",
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    priority: {
      type: String,
      required: false,
      default: "",
    },
    storyPoints: {
      type: Number,
      required: false,
      default: 0,
    },
    status: {
      type: String,
      required: false,
      default: "",
    },
    developmentPhase: {
      type: String,
      required: false,
      default: "",
    },
    totalLoggedHours: {
      type: String,
      required: false,
    },
    loggedHours: {
      type: [String],
      required: false,
    },
    taskType: {
      type: String,
      required: false,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
  },
  { collection: "product_backlog_items" },
);

const ProductBacklogItem =
  models.ProductBacklogItem ||
  model<IProductBacklogItem>("ProductBacklogItem", ProductBacklogItemSchema);

export default ProductBacklogItem;
