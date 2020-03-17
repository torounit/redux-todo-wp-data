import React from 'react';
import { useSelect, useDispatch } from '@wordpress/data';

const AddTodo = () => {
	const { addTodo } = useDispatch( 'todo' );
	let input;

	return (
		<div>
			<form onSubmit={e => {
				e.preventDefault();
				if (!input.value.trim()) {
					return;
				}
				addTodo(input.value);
				input.value = '';
			}}>
				<input ref={node => input = node} />
				<button type="submit">
					Add Todo
				</button>
			</form>
		</div>
	);
};

export default AddTodo;
