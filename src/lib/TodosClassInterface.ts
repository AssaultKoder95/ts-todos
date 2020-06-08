import { Todo } from './TodoInterface';
import { Promise } from 'es6-promise';

export interface TodosClassInterface {
	todos: Todo[];

	getTodos(): Promise<Todo[]>;
	addTodo(todo: Todo): void;
	deleteTodo(id: number): void;
	generateTodoId(): number;
}	