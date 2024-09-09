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
