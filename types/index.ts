import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model"


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
  },
  tags: string[],
  userId: string
}


// User Params
export type CreateUserParams = {
  name: string,
  isAdmin: boolean
}


// Tag Params
export type createTagParams = {
  tagName: string
}