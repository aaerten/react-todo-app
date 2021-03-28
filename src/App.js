import React, { useState, useEffect } from 'react';
import './App.css';

import { db } from './firebase';

import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
	const [inputText, setInputText] = useState('');
	const [todos, setTodos] = useState([]);
	const [status, setStatus] = useState('all');
	const [filteredTodos, setFilteredTodos] = useState([]);

	useEffect(() => {
		db.collection('todos').onSnapshot(function (querySnapshot) {
			setTodos(
				querySnapshot.docs.map((doc) => ({
					id: doc.id,
					todoText: doc.data().todoText,
					todoCompleted: doc.data().todoCompleted,
				}))
			);
		});
	}, []);

	useEffect(() => {
		const filterHandler = () => {
			switch (status) {
				case 'completed':
					setFilteredTodos(todos.filter((todo) => todo.todoCompleted === true));
					break;
				case 'uncompleted':
					setFilteredTodos(todos.filter((todo) => todo.todoCompleted === false));
					break;
				default:
					setFilteredTodos(todos);
					break;
			}
		};
		filterHandler();
	}, [todos, status]);

	return (
		<div className="App">
			<header>
				<h1>React To-Do App</h1>
			</header>
			<Form
				inputText={inputText}
				todos={todos}
				setTodos={setTodos}
				setInputText={setInputText}
				setStatus={setStatus}
			></Form>
			<TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos}></TodoList>
		</div>
	);
}

export default App;
