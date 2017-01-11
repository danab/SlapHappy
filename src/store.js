import { createStore, combineReducers } from 'redux';

import deck from './reducers/deck-reducer';
import piles from './reducers/piles-reducer';
import foundation from './reducers/foundation-reducer';

import initial from './utils/initialize';

const rootReducer = combineReducers({
	deck,
	piles,
	foundation
});


const store = createStore(
	rootReducer,
	initial,
	window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__() );

export default store;