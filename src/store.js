import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import socketIO from 'socket.io-client';

import games from './shared/reducers/games-reducer';
import foundation from './shared/reducers/foundation-reducer';
import { START_NEW_GAME } from './shared/actions/types';

const user = ( state = {}, action ) => {
	if ( action.type === 'SET_USERNAME' ) {
		return Object.assign( {}, state, { username: action.payload.username } );
	} else if ( action.type === START_NEW_GAME ) {
		return Object.assign( {}, state, { gameId: action.payload.gameId } );
	}
	return state;
};


const pending = ( state = true, action ) => ( action.type === START_NEW_GAME ) ? false : state;

import initial from './shared/utils/initialize';

const initialServer = { games: null, foundation: initial.foundation, pending: true, user: initial.user };

let middleware;

const production = process.env.NODE_ENV === 'production';

if ( production ) {
	const socket = socketIO.connect();

	// ht: https://github.com/czytelny/redux-socket.io-middleware/blob/master/redux-socket.io-middleware.js
	const socketIoMiddleware = (socket, channelName = 'action') => store => {
		socket.on(channelName, store.dispatch);

		return next => action => {
			if ( action.self ) {
				socket.emit(channelName, action);
			}
			return next(action);
		};
	};

	if ( window.__REDUX_DEVTOOLS_EXTENSION__) {
		middleware = compose(
			applyMiddleware( socketIoMiddleware( socket ) ),
			window.__REDUX_DEVTOOLS_EXTENSION__()
		);
	} else {
		middleware = compose(
			applyMiddleware( socketIoMiddleware( socket ) )
		);
	}

} else {
	middleware = window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__();
}

const rootReducer = combineReducers({
	games,
	foundation,
	pending,
	user
});


const store = createStore(
	rootReducer,
	( production ) ? initialServer : initial,
	middleware
);


export default store;