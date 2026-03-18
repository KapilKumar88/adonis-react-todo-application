import * as yup from 'yup';
import { TodoPriority, TodoStatus } from '@/types/todo.types';

export const upsertTodoSchema = yup.object({
    title: yup
        .string()
        .trim()
        .min(1, 'Title is required.')
        .max(255, 'Title must be at most 255 characters.')
        .required('Title is required.'),
    description: yup
        .string()
        .trim()
        .max(1000, 'Description must be at most 1000 characters.')
        .nullable()
        .default(null),
    priority: yup
        .string()
        .oneOf(Object.values(TodoPriority), 'Invalid priority.')
        .required('Priority is required.'),
    status: yup
        .string()
        .oneOf(Object.values(TodoStatus), 'Invalid status.')
        .required('Status is required.'),
    dueDate: yup
        .string()
        .nullable()
        .default(null),
    tagIds: yup
        .array()
        .of(yup.string().uuid().required())
        .default([]),
});

export type UpsertTodoFormValues = yup.InferType<typeof upsertTodoSchema>;