export interface ITask {
    _id: string;
    title: string;
    description: string;
    priority: string;
    type: string;
    status: string;
    tags: string[];
    assignee: string;
}