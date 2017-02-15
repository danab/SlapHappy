import { fromJS } from 'immutable';

import deck from './deck-reducer';
import piles from './piles-reducer';

import {
	DEAL_CARDS,
	FLIP_DECK,
	DECK_TO_PILE,
	DECK_TO_FOUNDATION,
	PILE_TO_FOUNDATION,
	FLIP_CARD_PILE,
	PILE_TO_PILE,
	START_NEW_GAME
} from '../actions/types';

const games = ( state = true, action ) => {
	const gameIdx = (action.self) ? 0 : 1;
	switch ( action.type ) {
		case DEAL_CARDS:
		case FLIP_DECK:
		case DECK_TO_FOUNDATION:
		case PILE_TO_FOUNDATION:
		case FLIP_CARD_PILE:
		case PILE_TO_PILE:
		case DECK_TO_PILE:
			return state
				.setIn( [gameIdx , 'deck' ], deck( state.getIn( [ gameIdx, 'deck' ] ), action ) )
				.setIn( [gameIdx , 'piles' ], piles( state.getIn( [ gameIdx, 'piles' ] ), action ) );
		case START_NEW_GAME:
			return fromJS( action.payload.games );
		default:
			return state;
	}
};

export default games;
