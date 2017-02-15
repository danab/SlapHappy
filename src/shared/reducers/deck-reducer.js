import { DEAL_CARDS, FLIP_DECK, DECK_TO_PILE, DECK_TO_FOUNDATION } from '../actions/types';
const deck = ( state = {}, action ) => {

	switch( action.type ) {
		case DEAL_CARDS: {
			const next = state.get('down').slice(-3).reverse();
			const newUp = state.get('up').concat(next);
			const newDown = state.get('down').splice(-3);

			return state
			.set('up', newUp)
			.set('down', newDown);
		}
		case FLIP_DECK:
			return state
				.set( 'up', state.get('down') )
				.set( 'down', state.get('up').reverse() );

		case DECK_TO_FOUNDATION:
			return state
				.set( 'up', state.get('up').pop() );
		case DECK_TO_PILE:
			return state.set( 'up', state.get( 'up' ).pop() );
		default:

			return state;
	}
};

export default deck;