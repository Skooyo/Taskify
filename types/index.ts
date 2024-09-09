import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";

// Product Backlog Params
export type CreateProductBacklogItemProps = {
  productBacklogItem: {
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
  };
  tags: string[];
  userId: string;
};

export type ProductBacklogItem = {
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
  assignee: string;
  tags: string[];
};

// User Params
export type CreateUserParams = {
  name: string;
  isAdmin: boolean;
};

export type User = {
  _id: string;
  name: string;
  isAdmin: string;
};

// Tag Params
export type CreateTagParams = {
  name: string;
};

export type Tag = {
  _id: string;
  name: string;
};
