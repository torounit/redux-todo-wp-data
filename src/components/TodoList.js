import React from 'react';
import { useSelect, useDispatch } from '@wordpress/data';

const Todo = ( { onClick, completed, text } ) => (
	<li
		onClick={ onClick }
		style={ {
			textDecoration: completed ? 'line-through' : 'none'
		} }
	>
		{ text }
	</li>
);

export const  TodoList = () => {
	const todos = useSelect( ( select ) => {
		return select( 'todo' ).getTodos()
	}, [] );
	const { toggleTodo } = useDispatch( 'todo' );
	return (
		<ul>
			{ todos.map( todo =>
				<Todo
					key={ todo.id }
					{ ...todo }
					onClick={ () => toggleTodo( todo.id ) }
				/>
			) }
		</ul>
	);
}
