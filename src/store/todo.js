import { registerStore, combineReducers } from '@wordpress/data';

const DEFAULT_STATE = [];

const generateUuid = () => {
	let chars = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split( '' );
	for ( let i = 0, len = chars.length; i < len; i ++ ) {
		switch ( chars[ i ] ) {
			case 'x':
				chars[ i ] = Math.floor( Math.random() * 16 ).toString( 16 );
				break;
			case 'y':
				chars[ i ] = ( Math.floor( Math.random() * 4 ) + 8 ).toString( 16 );
				break;
		}
	}
	return chars.join( '' );
};

const actions = {
	addTodo( text ) {
		return {
			type: 'ADD_TODO',
			id: generateUuid(),
			text
		};
	},

	toggleTodo( id ) {
		return {
			type: 'TOGGLE_TODO',
			id
		};
	}
};

registerStore( 'todo', {
	reducer: combineReducers( {
		todo( state = DEFAULT_STATE, action ) {
			switch ( action.type ) {
				case 'ADD_TODO':
					return [
						...state,
						{
							id: action.id,
							text: action.text,
							completed: false
						}
					];
				case 'TOGGLE_TODO':
					return state.map( todo =>
						( todo.id === action.id )
							? { ...todo, completed: !todo.completed }
							: todo
					);
				default:
					return state;
			}
		},
	} ),

	actions,

	selectors: {
		getTodos( state ) {
			return state.todo;
		},
	},
} );
