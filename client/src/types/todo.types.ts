import { Tag } from "./tags.types";

export enum TodoStatus {
    Pending = 'pending',
    InProgress = 'in_progress',
    Completed = 'completed',
    Backlog = 'backlog',
    Icebox = 'icebox',
}

export enum TodoPriority {
    Low = 'low',
    Medium = 'medium',
    High = 'high',
}

export interface Todo {
    id: string;
    title: string;
    description: string | null;
    status: TodoStatus;
    priority: TodoPriority;
    dueDate: string | null;
    tags: Tag[];
    createdAt: string;
    updatedAt: string;
}