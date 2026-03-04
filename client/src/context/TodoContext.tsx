import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { Todo, TodoStatus, TodoPriority } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { todos as mockTodos } from '@/utils/mockData';
import { generateId } from '@/utils/helpers';
import { useAuth } from '@/context/AuthContext';

interface TodoContextType {
  todos: Todo[];
  userTodos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  updateTodo: (id: string, data: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  deleteTodos: (ids: string[]) => void;
  toggleComplete: (id: string) => void;
  filterTodos: (todos: Todo[], status?: TodoStatus, priority?: TodoPriority, search?: string) => Todo[];
}

const TodoContext = createContext<TodoContextType>({} as TodoContextType);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todo-items', mockTodos);
  const { currentUser } = useAuth();

  const userTodos = useMemo(() =>
    currentUser ? todos.filter(t => t.userId === currentUser.id) : [],
    [todos, currentUser]
  );

  const addTodo = useCallback((data: Omit<Todo, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser) return;
    const now = new Date().toISOString();
    setTodos(prev => [...prev, { ...data, id: generateId(), userId: currentUser.id, createdAt: now, updatedAt: now }]);
  }, [currentUser, setTodos]);

  const updateTodo = useCallback((id: string, data: Partial<Todo>) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t));
  }, [setTodos]);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, [setTodos]);

  const deleteTodos = useCallback((ids: string[]) => {
    setTodos(prev => prev.filter(t => !ids.includes(t.id)));
  }, [setTodos]);

  const toggleComplete = useCallback((id: string) => {
    setTodos(prev => prev.map(t =>
      t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed', updatedAt: new Date().toISOString() } : t
    ));
  }, [setTodos]);

  const filterTodos = useCallback((list: Todo[], status?: TodoStatus, priority?: TodoPriority, search?: string) => {
    let result = list;
    if (status) result = result.filter(t => t.status === status);
    if (priority) result = result.filter(t => t.priority === priority);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q));
    }
    return result;
  }, []);

  return (
    <TodoContext.Provider value={{ todos, userTodos, addTodo, updateTodo, deleteTodo, deleteTodos, toggleComplete, filterTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
