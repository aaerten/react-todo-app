import React from 'react';
import { db } from '../firebase';

function Form({ inputText, setInputText, setStatus }) {
	const isEnabled = inputText.length <= 50;
	const inputTextHandler = (e) => {
		setInputText(e.target.value);
	};
	const submitTodoHandler = (e) => {
		e.preventDefault();
		db.collection('todos').add({
			todoText: inputText,
			todoCompleted: false,
		});
		setInputText('');
	};
	const statusHandler = (e) => {
		setStatus(e.target.value);
	};
	return (
		<div className="container">
			<div className="row">
				<form>
					<div className="input-group">
						<div className={`alert alert-danger ${isEnabled ? 'hide' : 'error'}`} role="alert">
							error! You can type at most fifty characters. Reduce and try again.
						</div>
						<div className="input-group">
							<input
								//{maxLength="50"}
								value={inputText}
								onChange={inputTextHandler}
								type="text"
								placeholder="Your To-Do Text"
								className="form-control"
							/>
							<button
								disabled={!isEnabled}
								onClick={submitTodoHandler}
								className="btn btn-primary"
								type="submit"
							>
								<i className="fas fa-plus-square"></i>
							</button>
						</div>
					</div>
					<div className="select">
						<select onChange={statusHandler} name="todos" className="form-select">
							<option value="all">All</option>
							<option value="completed">Completed</option>
							<option value="uncompleted">Uncompleted</option>
						</select>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Form;
