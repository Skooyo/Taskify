import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";

// Constants
export const taskPriority = ["Low", "Medium", "High", "Urgent"];

export const taskDevelopmentStage = [
  "Planning",
  "Development",
  "Testing",
  "Integration",
];

export const taskStatus = ["Not Started", "In Progress", "Completed"];

export const taskType = ["Story", "Bug"];

export const tags = [
  "Backend",
  "Database",
  "Framework",
  "API",
  "Frontend",
  "Bugfix",
];

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
  pathname: string;
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

export type DeleteProductBacklogItemByIdParams = {
  productBacklogItemId: string;
  pathname: string;
};

export type UpdateProductBacklogItemParams = {
  productBacklogItem: {
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
  };
  tags: string[];
  userId: string;
  pathname: string;
};

export const defaultProductBacklogItemState = {
  _id: "",
  title: "",
  description: "",
  priority: "Low",
  storyPoints: 0,
  status: "Not Started",
  developmentPhase: "Planning",
  totalLoggedHours: "0",
  loggedHours: [],
  taskType: "Story",
  createdAt: new Date(),
  assignee: {
    _id: "",
    name: "",
  },
  tags: [],
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
