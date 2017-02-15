import { DECK_TO_FOUNDATION, PILE_TO_FOUNDATION, START_NEW_GAME } from '../actions/types';
import { foundation as emptyFoundation } from '../utils/initialize';

const foundation = ( state = emptyFoundation, action ) => {
	switch( action.type ) {
		case DECK_TO_FOUNDATION:
			{
				let {foundationIdx, card} = action.payload;
				return state
				.set(foundationIdx, state.get(foundationIdx).push(card));
			} case PILE_TO_FOUNDATION: {
				let { foundationIdx, card } = action.payload;
				return state.set( foundationIdx, state.get( foundationIdx ).push( card ) );
			}
		case START_NEW_GAME:
			return emptyFoundation;
		default:
			return state;
	}
};

export default foundation;