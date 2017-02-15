import { PILE_TO_PILE, PILE_TO_FOUNDATION, DECK_TO_PILE } from '../actions/types';

// Flip the top card ( if neccesary )
const flipTopCard = ( state, pileIdx ) => {
	if ( state.getIn( [ pileIdx, 'up' ] ).size === 0 ) {
		return state
			.setIn( [ pileIdx, 'up' ], state.getIn( [ pileIdx, 'down' ] ).slice( -1 ) )
			.setIn( [ pileIdx, 'down' ], state.getIn( [ pileIdx, 'down' ] ).pop( -1 ) );
	} else {
		return state;
	}
};

const piles = ( state = {}, action ) => {
	switch( action.type ) {
		case PILE_TO_FOUNDATION: {
			const { pileIdx } = action.payload;
			const newUp = state.getIn( [ pileIdx, 'up' ] ).pop();
			const newState = state
				.setIn( [ pileIdx, 'up'], newUp );

			return flipTopCard( newState, pileIdx );
		}
		case PILE_TO_PILE: {
			const { newPileIdx, oldPileIdx, draggedPile } = action.payload;
			const newState = state
				.setIn(
					[ newPileIdx, 'up' ],
					state.getIn( [ newPileIdx, 'up' ] ).concat( draggedPile )
				)
				.setIn(
					[ oldPileIdx, 'up' ],
					state.getIn( [ oldPileIdx, 'up' ] ).slice( 0, -1 * draggedPile.length )
				);

			return flipTopCard( newState, oldPileIdx );
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