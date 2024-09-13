import { model, models, Schema } from "mongoose";
import { IProductBacklogItem } from "./product_backlog_item.model";

export interface ISprint {
  _id: string;
  title: string;
  status: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  notStartedTasks: IProductBacklogItem[];
  inProgressTasks: IProductBacklogItem[];
  completedTasks: IProductBacklogItem[];
}

const SprintSchema = new Schema<ISprint>({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  notStartedTasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductBacklogItem",
      required: false,
      default: [],
    },
  ],
  inProgressTasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductBacklogItem",
      required: false,
      default: [],
    },
  ],
  completedTasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductBacklogItem",
      required: false,
      default: [],
    },
  ],
});

const Sprint = models.Sprint || model<ISprint>("Sprint", SprintSchema);

export default Sprint;
