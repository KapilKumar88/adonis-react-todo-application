import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import { TodoStatus, TodoPriority } from '@/types/todo.types';

const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: TodoStatus.Pending, label: 'Pending' },
    { value: TodoStatus.InProgress, label: 'In Progress' },
    { value: TodoStatus.Completed, label: 'Completed' },
    { value: TodoStatus.Backlog, label: 'Backlog' },
    { value: TodoStatus.Icebox, label: 'Icebox' },
];

const priorityOptions = [
    { value: 'all', label: 'All Priority' },
    { value: TodoPriority.Low, label: 'Low' },
    { value: TodoPriority.Medium, label: 'Medium' },
    { value: TodoPriority.High, label: 'High' },
];

interface TodoFiltersProps {
    statusFilter: string;
    priorityFilter: string;
    selectedRowCount: number;
    onStatusChange: (value: string) => void;
    onPriorityChange: (value: string) => void;
    onBulkDelete: () => void;
}

export default function TodoFilters({
    statusFilter,
    priorityFilter,
    selectedRowCount,
    onStatusChange,
    onPriorityChange,
    onBulkDelete,
}: Readonly<TodoFiltersProps>) {
    return (
        <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={onStatusChange}>
                <SelectTrigger className="w-[140px] h-8"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                    {statusOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={onPriorityChange}>
                <SelectTrigger className="w-[140px] h-8"><SelectValue placeholder="Priority" /></SelectTrigger>
                <SelectContent>
                    {priorityOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {selectedRowCount > 0 && (
                <Button variant="destructive" size="sm" onClick={onBulkDelete}>
                    <Trash2 className="h-3 w-3 mr-1" /> Delete {selectedRowCount}
                </Button>
            )}
        </div>
    );
}