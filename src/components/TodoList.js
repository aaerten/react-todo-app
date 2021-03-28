import React from 'react';

import Todo from './Todo';

function TodoList({ filteredTodos }) {
	return (
		<div className="todo-container">
			<ul className="todo-list">
				{filteredTodos.map((todo) => (
					<Todo key={todo.id} todo={todo}></Todo>
				))}
			</ul>
		</div>
	);
}

export default TodoList;
