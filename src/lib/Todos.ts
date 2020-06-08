import { TodosClassInterface } from './TodosClassInterface';
import { Todo } from './TodoInterface';
import { Promise } from 'es6-promise';

export class Todos implements TodosClassInterface {
	todos: Todo[];

	private getItem(): Todo[] {
		return JSON.parse(localStorage.getItem('todos'));
	}

	private setItem(todos: Todo[]): void {
		localStorage.setItem('todos', JSON.stringify(todos));
	}

	constructor() {
		const initialTodos = [{
			id: 1,
			text: 'test todo',
		}];

		if (localStorage.getItem('todos') === null) {
			localStorage.setItem('todos', JSON.stringify(initialTodos));
		}

		this.todos = JSON.parse(localStorage.getItem('todos'));
	}

	getTodos(): Promise<Todo[]> {
		this.todos = this.getItem();
		return new Promise((resolve, reject) => {
			resolve(this.todos);
		});
	}

	generateTodoId(): number {
		return Math.floor(Math.random() * 10000);
	}

	addTodo(todo: Todo): Promise<Todo> {
		let todos = this.getItem();
		todos.push(todo);
		this.setItem(todos);

		return new Promise((resolve, reject) => resolve());
	}

	deleteTodo(id: number): Promise<Todo> {
		let todos = this.getItem();
		todos = todos.filter((todo) => todo.id !== id);
		this.setItem(todos);
		return new Promise((resolve, reject) => resolve());
	}
}