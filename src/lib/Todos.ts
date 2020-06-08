import { TodosClassInterface } from './TodosClassInterface';
import { Todo } from './TodoInterface';
import { Promise } from 'es6-promise';

export class Todos implements TodosClassInterface {

	getItem(): Todo[] {
		return JSON.parse(localStorage.getItem('todos'));
	}

	setItem(todos: Todo[]): void {
		localStorage.setItem('todos', JSON.stringify(todos));
	}

	constructor() {
		if (localStorage.getItem('todos') === null) {
			localStorage.setItem('todos', JSON.stringify([{
				id: 1,
				text: 'test todo',
			}]));
		}
		
		console.log(localStorage.getItem('todos'));

		this.todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos: Todo[];

	getTodos(): Promise<Todo[]> {
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