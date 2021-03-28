import React from 'react';
import { db } from '../firebase';

function Todo({ todo }) {
	const deleteHandler = () => {
		db.collection('todos').doc(todo.id).delete();
	};

	const completeHandler = () => {
		db.collection('todos').doc(todo.id).update({
			todoCompleted: !todo.todoCompleted,
		});
	};

	return (
		<div className="todo">
			<li className={`${todo.todoCompleted ? 'completed' : ''}`}>{todo.todoText}</li>
			<button onClick={completeHandler} className="btn btn-success">
				<i className={`${todo.todoCompleted ? 'fas fa-check-double' : 'fas fa-check'}`}></i>
			</button>
			<button onClick={deleteHandler} className="btn btn-danger">
				<i className="fas fa-trash"></i>
			</button>
		</div>
	);
}

export default Todo;
