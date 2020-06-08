import $ = require('jquery');
import { Todos } from './lib/Todos';

let todos = new Todos();

function loadTodos() {
	todos.getTodos().then((todos) => {
		for (let todo of todos) {
			$('#todos').append(`<li> ${todo.text} has id: ${todo.id} <button id=${todo.id} class='deleteTodo'>X</button> </li>`);
		}
	});
}


$("#addTodoBtn").click(() => {
	let todoText: string = <string>$('#todoText').val();

	let newTodo = {
		id: todos.generateTodoId(),
		text: todoText,
	};

	todos.addTodo(newTodo).then(() => {
		$('#todos').html('');
		loadTodos();
	})
});

$(document).on('click', '.deleteTodo', (e) => {
	const id: number = parseInt(e.target.id, 10);

	todos.deleteTodo(id).then(() => {
		$('#todos').html('');
		loadTodos();
	})
});

loadTodos();