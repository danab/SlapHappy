import { FLIP_CARD_PILE, PILE_TO_PILE, PILE_TO_FOUNDATION, DECK_TO_PILE } from '../actions/types';

const piles = ( state = {}, action ) => {
	switch( action.type ) {
	case PILE_TO_FOUNDATION: {
		const { pileIdx } = action.payload;
		const newUp = state.getIn( [ pileIdx, 'up' ] ).pop();
		return state
				.setIn( [ pileIdx, 'up'], newUp );
	}
	case FLIP_CARD_PILE: {
		const { pileIdx } = action.payload;
		return state
				.setIn( [ pileIdx, 'up' ], state.getIn( [ pileIdx, 'down' ] ).slice( -1 ) )
				.setIn( [ pileIdx, 'down' ], state.getIn( [ pileIdx, 'down' ] ).pop( -1 ) );
	}
	case PILE_TO_PILE: {
		const { newPileIdx, oldPileIdx, draggedPile } = action.payload;
		return state
				.setIn(
					[ newPileIdx, 'up' ],
					state.getIn( [ newPileIdx, 'up' ] ).concat( draggedPile )
				)
				.setIn(
					[ oldPileIdx, 'up' ],
					state.getIn( [ oldPileIdx, 'up' ] ).slice( 0, -1 * draggedPile.length )
				);
	}
	case DECK_TO_PILE: {
		const { card, pileIdx } = action.payload;
		return state
				.setIn( 
					[ pileIdx, 'up' ], 
					state.getIn( [ pileIdx, 'up' ] ).push( card ) 
				);
	}
	default:
		return state;
	}
};

export default piles;