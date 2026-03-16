export interface TodoTag {
    id: string;
    name: string;
    color: string | null;
    type: string;
    createdAt: string;
}

export interface Todo {
    id: string;
    title: string;
    description: string | null;
    status: 'pending' | 'in_progress' | 'completed' | 'backlog' | 'icebox';
    priority: 'low' | 'medium' | 'high';
    dueDate: string | null;
    tags: TodoTag[];
    createdAt: string;
    updatedAt: string;
}


export type TodoStatus = Todo['status'];
export type TodoPriority = Todo['priority'];